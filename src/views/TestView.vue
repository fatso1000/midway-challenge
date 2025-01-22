<template>
  <div class="grid-container">
    <draggable
      v-model="filteredData"
      class="grid gap-4 p-4 grid-cols-6 w-full max-xl:gap-3 max-xl:p-2 max-md:grid-cols-1 max-lg:grid-cols-4"
      v-bind="dragOptions"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <component :is="element.component" v-bind="element.props" :key="element.id" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, onMounted, ref, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const filteredData = ref()
const dragOptions = computed(() => ({
  animation: 0,
  group: 'grid',
  disabled: false,
  ghostClass: 'ghost',
}))

watch(dashboardStore, (store) => {
  filteredData.value = Object.values(store.cards).filter((card) => !card.isChart)
})

onMounted(() => {
  dashboardStore.fetchAllCardsData()
})

// Event Handlers
const onDragStart = (evt: unknown) => {
  console.log('Drag started:', evt)
}

const onDragEnd = (evt: unknown) => {
  console.log('Drag ended:', evt)
}
</script>

<style>
/* Grid Container */
.grid-container {
  width: 100%;
  margin: auto;
}

/* CSS Grid */

/* Card Styles */
.card {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: grab;
  transition: all 0.2s ease;
}

/* Dragging State */
.card:active {
  cursor: grabbing;
  opacity: 0.8;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
