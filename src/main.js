import Vue from 'vue'
import App from './App'
import DataGrid from './components/data-grid/DataGrid.vue'

Vue.config.productionTip = false

Vue.component('DataGrid', DataGrid)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {DataGrid, App},
  template: '<App/>'
})
