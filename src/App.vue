<template>
  <div id="app">
    <DataGrid
      :column-settings="columnSettings"
      :data-source="dataSource"
      :page-size="5"
      pageable
      unique-field="id"
    >

    </DataGrid>
  </div>
</template>

<script>

import {mockData} from './mock/data'
import DataGridPagination from './components/data-grid/DataGridPagination.vue'

export default {
  name: 'App',
  components: {
    DataGridPagination
  },
  data () {
    return {
      columnSettings: [{
        fieldName: 'id',
        fieldType: 'number',
        fieldLabel: '#',
        width: '50px'
      }, {
        fieldName: 'name',
        fieldType: 'string',
        fieldLabel: 'Name'
      }, {
        fieldName: 'email',
        fieldType: 'string',
        fieldLabel: 'Email'
      }, {
        fieldName: 'group.name',
        fieldType: 'string',
        fieldLabel: 'Group'
      }],
      dataSource: mockData
    }
  },
  methods: {},
  mounted () {
  },
}
</script>

<style>
#app {

}
</style>
