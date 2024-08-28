<template>
  <div>
    <table class="table">
      <thead>

      <th
        v-for="(column, key) in columnSettings"
        :key=key>
        {{ column.fieldLabel }}
      </th>



      </thead>
      <tbody>

      <tr v-for="(entityData, entityKey) in source"
          :key="entityKey"
          @click="onRowClick(entityData[uniqueField])"
          :class="{
          'selected-row': selectedRow === entityData[uniqueField]
        }"
      >
        <td
          v-for="(entityColumn, entityColumnKey) in columnSettings"
          :key=entityColumnKey>
          {{ getEntityRowData(entityColumn, entityData) }}
        </td>
      </tr>
      </tbody>

    </table>

    <DataGridPagination
      v-if="pageable"
      :record-count="dataSource.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @page-changed="onPageChange($event)"
    />
  </div>
</template>

<script>

import DataGridPagination from './DataGridPagination.vue'

export default {
  name: 'DataGrid',
  components: {
    DataGridPagination
  },
  data () {
    return {
      selectedRow: null,
      source: [],
      currentPage: 1,
    }
  },
  props: {
    columnSettings: {
      type: Array,
    },
    dataSource: {
      type: Array,
    },
    uniqueField: { // todo: может не передатся пользователем, нужно будет высчитывать по key
      type: String,
    },
    pageable: {
      type: Boolean,
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },

  watch: {
    dataSource: {
      handler () {
        this.source = this.pageable
          ? this.dataSource.slice(0, this.pageSize)
          : this.dataSource
      },
      immediate: true
    }
  },

  methods: {
    onPageChange ({page}) {
      const start = (page - 1) * this.pageSize
      const end = start + this.pageSize
      this.source = this.dataSource.slice(start, end)

      this.currentPage = page
    },
    onRowClick (uniqueField) {
      this.selectedRow = uniqueField
    },
    getEntityRowData (entityColumn, entityData) {
      let rowValue = entityData[entityColumn.fieldName]

      if (entityColumn.fieldName.includes('.')) {
        const objAddressArray = entityColumn.fieldName.split('.')
        rowValue = objAddressArray.reduce((acc, key) => acc && acc[key], entityData)
      }

      return rowValue
    }
  }
}
</script>

<style scoped>
.selected-row {
  background: #ccc;
}

::v-deep .page-item {
  outline: 1px solid red;
  background: red;
}
</style>
