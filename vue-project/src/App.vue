<script setup>
import MyTable from "@/components/my-table.vue";
import {computed, shallowRef} from "vue";
import rawData from "@/rawData.js";
import StatusBadge from "@/components/status-badge/status-badge.vue";

const raw = shallowRef()
const mappedRows = computed(()=> {
  if(!raw.value){
    return []
  }

  return raw.value.metrics.map(metric => ({
    ...metric,
    metricId: metric.masterMetricId,
    campaignId: "1",
    dataSourceId: "1"
  }))
})

setTimeout(()=> {
  raw.value = rawData
}, 300)

const colDefs = computed(()=> [
  {
    headerName: 'status',
    valueGetter: ({data}) => data.status.toLowerCase(),
    cellRendererSelector: (params) => ({
      params: {
        ...params,
        value: params.data.status
      },
      component: StatusBadge
    }),
    flex: 1.5
  },
  {
    headerName: 'value',
    valueGetter: ({data}) => {
      if (data.noData) {
        return 'no_data_collected'
      }
      return data.value
    },
    flex: 1.5
  },
  {
    headerName: 'unit',
    valueGetter: ({data}) => data.unit,
    flex: 1.25
  },
])
</script>

<template>
  <div class="app">
    <my-table
        :columnDefs="colDefs"
        :row-data="mappedRows"/>
  </div>
</template>
<style lang="css">
.app{
  height: 20rem;
  width: 60rem;
}
</style>
