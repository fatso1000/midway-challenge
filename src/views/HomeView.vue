<template>
  <Layout>
    <main class="flex flex-col bg-base-200">
      <div class="navbar bg-base-100 border-b justify-between max-md:flex-wrap">
        <div class="flex items-center sm:flex-1 max-sm:w-full">
          <label
            for="inner-drawer"
            class="btn btn-ghost drawer-button xl:hidden"
            aria-label="Toggle menu"
          >
            <Icon icon="tabler:menu-2" width="24" height="24" />
          </label>
          <strong class="text-xl mx-4">Reportes de Venta</strong>
          <GenericButton
            icon="tabler:share"
            :is-outlined="true"
            :is-square="true"
            color="neutral"
            class="ml-2"
          />
        </div>
        <DashboardDatePicker />
      </div>

      <div class="flex h-full w-full relative">
        <div class="grid-container">
          <draggable
            v-model="filteredData"
            class="grid gap-4 p-4 grid-cols-6 w-full max-xl:gap-3 max-xl:p-2 max-md:grid-cols-1 max-lg:grid-cols-4"
            v-bind="dragOptions"
            item-key="id"
            @start="onDragStart"
            @end="onDragEnd"
          >
            <template #item="{ element }">
              <component :is="element.component" v-bind="element.props" :key="element.id" />
            </template>
          </draggable>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import DashboardDatePicker from '@/components/concrete/DashboardDatePicker/DashboardDatePicker.vue'
import Layout from '@/components/concrete/PageLayout/PageLayout.vue'
import GenericButton from '@/components/generics/Button/GenericButton.vue'
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

const onDragStart = (evt: unknown) => {
  // console.log('Drag started:', evt)
}

const onDragEnd = (evt: unknown) => {}
</script>

<style>
.grid-container {
  width: 100%;
  margin: auto;
}

/* Card Styles */
.card {
  cursor: grab;
  transition: all 0.2s ease;
}

/* Dragging State */
.card:active {
  cursor: grabbing;
  opacity: 0.8;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
