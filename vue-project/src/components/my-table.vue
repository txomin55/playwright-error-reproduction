<script setup>
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-enterprise/styles/ag-theme-material.css' // Optional theme CSS
import {AgGridVue} from "ag-grid-vue3";
import {computed, onMounted, shallowRef} from "vue";

const props = defineProps({
  columnDefs: {
    type: Array,
    default: () => []
  },
  rowData: {
    type: Array,
    default: []
  },
  treeData: {
    type: Boolean,
    default: false
  }
})

const colDef = computed(() => props.treeData ? props.columnDefs.slice(1) : props.columnDefs)

const getDataPath = (dataRow) => dataRow.path

const autoGroupColumnDef = computed(() => ({
  ...props.columnDefs[0],
  cellRendererParams: {
    suppressCount: true,
  },
}))

const defaultColDef = {
  sortable: false,
  suppressHeaderMenuButton: true,
  suppressMovable: true
}

const gridApi = shallowRef(null)
defineExpose({
  gridApi
})
const resizeTable = () => {
  if (gridApi.value) {
    gridApi.value.sizeColumnsToFit()
  }
}
const onGridReady = (params) => {
  gridApi.value = params.api;
  resizeTable()
}

const loading = shallowRef(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})

</script>

<template>
  <div class="esg-table" ref="tableRef">
    <ag-grid-vue
        :key="`${new Date().getTime()}_${false}`"
        :auto-group-column-def="autoGroupColumnDef"
        :column-defs="colDef"
        :default-col-def="defaultColDef"
        :enable-rtl="false"
        :get-data-path="getDataPath"
        :pagination-page-size="20"
        :pagination-page-size-selector="[20, 50, 100]"
        :row-data="props.rowData"
        :tree-data="props.treeData"
        class="ag-theme-material"
        :loading="loading"
        pagination
        pagination-auto-page-size
        style="width: 100%; height: 100%;"
        suppress-cell-focus
        suppress-context-menu
        suppress-horizontal-scroll
        @grid-ready="onGridReady"
    />
  </div>
</template>

<style lang="css">
.esg-table {
  min-height: 15rem;
  height: 100%;
  background: red;
}
</style>
