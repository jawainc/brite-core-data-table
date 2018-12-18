<template>
    <div class="data-table-wrapper">
        <div class="data-table">
			<div class="table-header">
				<div class="title">{{title}}</div>
				<div class="search">
					<span><font-awesome-icon class="search-icon" icon="search"/></span>
					<input type="search" id="search" @input="search($event.target.value)" name="search" />
				</div>
			</div>
					<table>
						<thead>
							<tr>
								<th v-for="(head, headIndex) in columns" :key="headIndex" >
									{{head.name}}
									<span v-if="head.sort" @click="sort(head.name, 1)" class="sort-up"><font-awesome-icon class="sort-up-icon" icon="caret-up" /></span>
									<span v-if="head.sort" @click="sort(head.name, -1)" class="sort-down"><font-awesome-icon class="sort-up-icon" icon="caret-down" /></span>
								</th>
							</tr>
						</thead>
						<tbody>
								<tr v-for="(data, rowIndex) in tableData" :key="rowIndex">
									<td v-for="(col, colIndex) in columns" :key="colIndex" >
										<div class="head">{{columns[colIndex]['name']}}:</div>
                                        <div class="content">{{data[col.name] | parseValue(col)}}</div>
                                        <font-awesome-icon v-if="col.edit" class="f-icon" icon="pen" @click="edit(rowIndex, col)" />
                                    </td>
								</tr>
						</tbody>
					</table>
				</div>

				<!-- Overlay -->
        <transition name="bounce">
		<div class="editor-overlay" v-if="showEdit">
			<div class="flex-container">
				<div class="row"> 
					<div class="flex-item"><input type="text" class="editor-input" v-model="editValue" /></div>
					<div class="flex-item"><button type="button" class="editor-button-save" @click="save()">Save</button></div>
				</div>
				<div class="close-overlay" @click="closeEdit()"><font-awesome-icon icon="times" /></div>
			</div>
		</div>
        </transition>
    </div>
</template>
<script src='./_data_table.js' ></script>
