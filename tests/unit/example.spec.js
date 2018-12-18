import { shallowMount } from '@vue/test-utils';
import DataTable from '@/components/DataTable/DataTable.vue';

let dummyProps = {
  title: 'Table Title',
        file: 'https://docs.google.com/spreadsheets/d/1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE/export?format=csv&id=1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE&gid=1376887707',
        fileLocation: 'remote',
        columns: [
          {
            name: 'Name',
            sort: true,
            edit: false,
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
            sort: false,
            edit: false,
            type: 'date'
          },
          {
            name: 'Amount',
            sort: false,
            edit: false,
            type: 'currency',
            symbol: '$'
          }
        ]
};

let dummyTableData = [
  {
    Id: 'abcdefgh',
    Name: 'ABC Person',
    Description: 'Some description',
    Date: '2018-05-04',
    Amount: '500'
  },
  {
    Id: 'abcdefghih',
    Name: 'GHT Person',
    Description: 'Some Other description',
    Date: '2018-09-04',
    Amount: '100'
  },
  {
    Id: 'abcdefghklo',
    Name: 'KLO Person',
    Description: 'KLO description',
    Date: '2018-01-08',
    Amount: '300'
  }
]

describe('DataTable.vue', () => {
  const wrapper = shallowMount(DataTable, {
    stubs: ['font-awesome-icon'],
    propsData: dummyProps
  });
  wrapper.setData({
    tableData: dummyTableData,
    dataStore: dummyTableData,
  });
  const tHeads = wrapper.findAll('th');
  const propsColumns = dummyProps.columns;

  it('renders table properly', () => {
    expect(wrapper.classes()).toContain('data-table-wrapper');
  });
  test ('table has correct title', () => {
    expect(wrapper.find('.title').text()).toEqual(dummyProps.title);
  });
  describe('Table Columns', () => {
    
    for (let index = 0; index < tHeads.length; index++) {
      test(`has column: ${propsColumns[index].name}`, () => {
        expect(tHeads.at(index).text()).toEqual(propsColumns[index].name);
      });

      if (propsColumns[index].sort) {
        test(`column ${propsColumns[index].name} is sortable`, () => {
          expect(tHeads.at(index).contains('font-awesome-icon-stub')).toBe(true);
        });
      }
      
    }
  });
  describe('Table Data', () => {
    const vm = wrapper.vm;
    const dummyDataLength = dummyTableData.length;

    describe('SORT', () => {
      test('sort data in ASC order', () => {
        vm.sort(propsColumns[0].name, 1);
        let ascSort = dummyTableData[0][propsColumns[0].name] < dummyTableData[1][propsColumns[0].name]
        expect(ascSort).toBeTruthy();
      });
  
      test('sort data in DESC order', () => {
        vm.sort(propsColumns[0].name, -1);
        let ascSort = dummyTableData[0][propsColumns[0].name] > dummyTableData[1][propsColumns[0].name]
        expect(ascSort).toBeTruthy();
      });
    })

    describe('SEARCH', () => {
      test('empty value should render all records', () => {
        vm.search('');
        expect(vm.tableData.length).toEqual(dummyDataLength);
      });
  
      test('should call search methods with search value', () => {
        vm.search = jest.fn();
        vm.search('Some value');
        expect(vm.search).toBeCalled();
        expect(vm.search).toBeCalledWith('Some value');
      });
      
    })
    
  });

})
