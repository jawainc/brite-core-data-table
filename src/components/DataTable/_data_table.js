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
                let x = a[col].toLowerCase();
                let y = b[col].toLowerCase();
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