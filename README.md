## How to use data table component ?
import component in vue file
```
import DataTable from '@/components/DataTable/DataTable.vue';
```
define component in script section
```
components: {
    DataTable
  }
``` 

define component props in data function
```
data: function () {
    return {
      filePath: 'path/to/file',
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
          name: 'Date',
          sort: false,
          edit: false,
          type: 'date'
        }
      ]
    }
  }
```
options for column property
* `name: string` name of column

* `sort: boolean` will set column to sortable 

* `edit: boolean` will set column vale editable

* `type: string` only type 'date' is available. setting this type will filter column value as Date

In Template section of vue file, add tag like this:
```
<template>
  <div>
    <DataTable 
      title="Payment Data"
      :file="filePath"
      :file-location="fileLocation"
      :columns='columns'
     />
  </div>
</template>
```
attributes for DataTable
* `title:string` tile to appear on top of table

* `file:string` file path to load from

* `file-location:string` value are 'remote' or 'local', only remote will work now

* `columns:object` columns properties/options

# Project setup
project is created using [vue-cli](https://cli.vuejs.org/). install vue-cli.
```
npm install -g @vue/cli
``` 
run vue-cli GUI by
```
vue ui
```
through this GUI load project and manage dependies, run tasks like serve build test. This is an easy and recomended way.

or

through command line


```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

## Deployment setup
1st build the project through vue-cli GUI or through command line
```
npm run build
```
this will place all build files in /dist folder at root of the project. Copy all files and folders to deployment server. index.html file is included so accessing server will run the project in browser.

### Improvements
* for editing, different input types can be used based on column types. e.g select, dates, textarea
* paging could be added
