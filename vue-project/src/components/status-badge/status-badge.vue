<script setup>
import {computed} from "vue";
import {getStatusColor} from "./getStatusColor.js";

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  },
  showLoading: {
    type: Boolean,
    default: false
  }
})

const badgeText = computed(() => {
  if (!props.params.value) return null
  return props.params.value
})
</script>

<template>
  <div class="status-badge">
    <div
        v-if="badgeText"
    >
      {{badgeText}} - {{getStatusColor(props.params.value)}}
    </div>
  </div>
</template>
<style lang="css">
.status-badge {
  padding-top: 0.8rem;
}
</style>
