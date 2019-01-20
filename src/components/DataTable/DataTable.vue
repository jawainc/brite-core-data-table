<template>
    <div class="data-table-wrapper">
        <div class="data-table-wrapper__data-table">
			<div class="data-table__header">
				<div class="title">{{title}}</div>
				<div class="search">
					<span><font-awesome-icon class="search__icon" icon="search"/></span>
					<input class="search__input" type="search" id="search" @input="search($event.target.value)" name="search" />
				</div>
			</div>
					<table class="data-table__table">
						<thead class="table__head">
							<tr class="table__head__row">
								<th class="head__row__column" v-for="(head, headIndex) in columns" :key="headIndex" >
									{{head.name}}
									<span v-if="head.sort" @click="sort(head.name, 1)" class="column__sort-arrow column__sort-arrow--up"><font-awesome-icon class="sort-up-icon" icon="caret-up" /></span>
									<span v-if="head.sort" @click="sort(head.name, -1)" class="column__sort-arrow column__sort-arrow--down"><font-awesome-icon class="sort-up-icon" icon="caret-down" /></span>
								</th>
							</tr>
						</thead>
						<tbody class="table__body">
								<tr class="table__body__row" v-for="(data, rowIndex) in tableData" :key="rowIndex">
									<td class="body__row__column" v-for="(col, colIndex) in columns" :key="colIndex" >
										<div class="row__column__content-head">{{columns[colIndex]['name']}}:</div>
                                        <div class="row__column__content">{{data[col.name] | parseValue(col)}}</div>
                                        <font-awesome-icon v-if="col.edit" class="row__column__f-icon" icon="pen" @click="edit(rowIndex, col)" />
                                    </td>
								</tr>
						</tbody>
					</table>
				</div>

				<!-- Overlay -->
        <transition name="bounce">
		<div class="editor-overlay" v-if="showEdit">
			<div class="editor-overlay__container">
				<div class="overlay-container-row"> 
					<div class="overlay-container-row__flex-item"><input type="text" class="flex-item__input" v-model="editValue" /></div>
					<div class="overlay-container-row__flex-item"><button type="button" class="button button--overlay" @click="save()">Save</button></div>
				</div>
				<div class="editor-overlay__close" @click="closeEdit()"><font-awesome-icon icon="times" /></div>
			</div>
		</div>
        </transition>
    </div>
</template>
<script>
import Papa from 'papaparse';
import moment from 'moment';
import _ from 'lodash';

export default {
    name: 'DataTable',
    // get props for component
    props: ['title', 'file', 'fileLocation', 'columns'],
    data: function () {
        return {
            showEdit: false,
            tableHeads: [],
            tableData: [],
            dataStore: [],
            editValue: '',
            editRowIndex: null,
            editCol: null
        }
    },
    mounted() {
        /**
         * load remote csv file
         * using library papa parse
         */
        Papa.parse(this.file, {
            download: this.fileLocation === 'remote',
            dynamicTyping: true,
            header: true,
            complete: (results) => {
                let data = results.data;
                this.tableData = data;
                this.dataStore = data;
                _.forEach(this.columns, (obj) => {
                   this.tableHeads.push(obj.name);     
                });
            }
        });
    },
    filters: {
        // filter for dates
        parseValue: function (value, col) {
          let ret = value;
          if (col.type === 'date') {
            ret  = moment(value).format('MM/DD/YY');
          }
          return ret;
        }
    },
    methods : {
        /**
         * show edit popup
         * 
         * @param {number} rowIndex 
         * @param {object} col 
         */
        edit (rowIndex, col) {
            this.editRowIndex = rowIndex;
            this.editCol = col;
            this.editValue = this.tableData[rowIndex][col.name];
            this.showEdit = true;
        },
        /**
         * close edit popup
         */
        closeEdit () {
            this.showEdit = false;
        },
        /**
         * save edited value
         */
        save () {
            this.tableData[this.editRowIndex][this.editCol.name] = this.editValue;
            this.closeEdit();
        },
        /**
         * sort column in asceding (1)
         * or descending (-1) order
         * 
         * @param {string} col 
         * @param {number} direction 
         */
        sort (col, direction) {
			this.tableData.sort((a,b) => {
				let x;
				let y;
				if (_.isNil(a[col].toLowerCase)) {
					x = a[col];
					y = b[col];
				} else {
					x = a[col].toLowerCase();
					y = b[col].toLowerCase();
				}
                if (x < y) {return -1 * direction;}
                if (x > y) {return 1 * direction;}
                return 0;
            })
        },
        /**
         * search data for given value
         * @param {string} value 
         */
        search (value) {
            this.tableData = [];
            if (_.isEmpty(value)) {
                this.tableData = this.dataStore;
                return;    
            }
            this.tableData = _.filter(this.dataStore, (obj) => {
                let ret = false;
                _.forEach(this.tableHeads, (head) => {
                    if (!ret && _.includes(_.lowerCase(obj[head]), _.lowerCase(value)))
                        ret = true;
                })
                return ret;
                
            });
        }
    }
}
</script>
