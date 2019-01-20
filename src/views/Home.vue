<template>
  <div class="data-table-container">
    <DataTable 
      title="Payment Data"
      :file="filePath"
      :file-location="fileLocation"
      :columns='columns'
     />
  </div>
</template>

<script>
// import DataTable component
import DataTable from '@/components/DataTable/DataTable.vue';

export default {
  name: 'home',
  data: function () {
    return {
      filePath: 'https://docs.google.com/spreadsheets/d/1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE/export?format=csv&id=1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE&gid=1376887707',
      fileLocation: 'remote',
      // columns passed to component
      columns: [
        {
          name: 'Name',
          sort: true,
          edit: true,
          type: 'string'
        },
        {
          name: 'Description',
          sort: true,
          edit: true,
          type: 'string'
        },
        {
          name: 'Date',
          sort: true,
          edit: true,
          type: 'date'
        },
        {
          name: 'Amount',
          sort: true,
          edit: true,
          type: 'currency',
          symbol: '$'
        }
      ]
    }
  },
  components: {
    // define component
    DataTable
  }
}
</script>
