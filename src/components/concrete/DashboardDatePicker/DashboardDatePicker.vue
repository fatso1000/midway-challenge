<template>
  <div class="inline-flex items-center gap-3">
    <label className="input input-bordered flex items-center gap-2">
      <Icon icon="tabler:calendar" width="20" height="20" />
      <flat-pickr v-model="store.selectedDate" v-bind:class="'grow'" :config="config" />
    </label>
    <div class="max-lg:hidden inline-flex items-center gap-2">
      <GenericButton
        v-for="opt in options"
        v-bind:key="opt.id"
        :is-outlined="opt.id !== preselectedDate"
        :text="opt.label"
        size="xs"
        v-on:click="onRangeClick(opt.id, opt.range)"
        :selected="opt.id === preselectedDate"
      >
      </GenericButton>
    </div>
    <div class="lg:hidden relative">
      <Dropdown title="Dates" align="dropdown-left">
        <GenericButton
          v-for="opt in options"
          v-bind:key="opt.id"
          :is-outlined="opt.id !== preselectedDate"
          :text="opt.label"
          size="xs"
          v-on:click="onRangeClick(opt.id, opt.range)"
          :selected="opt.id === preselectedDate"
        >
        </GenericButton>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Spanish } from 'flatpickr/dist/l10n/es.js'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { ref } from 'vue'
import type { BaseOptions } from 'flatpickr/dist/types/options'
import GenericButton from '@/components/generics/Button/GenericButton.vue'
import { useDashboardStore } from '@/stores/dashboard'
import getRangeDate, { formatDateValue } from '@/helpers/getRangeDate'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Dropdown from '@/components/generics/CustomDropdown/CustomDropdown.vue'

const store = useDashboardStore()

const onDatePickerChange = (e: Date[]) => {
  if (e.length > 1) {
    const fulldate = formatDateValue(e[0], e[1])
    store.onDateChange(fulldate)
  }
}

const config: Partial<BaseOptions> = {
  mode: 'range',
  locale: Spanish,
  dateFormat: 'd-m-Y',
  onChange: onDatePickerChange,
}

const preselectedDate = ref<string>('7dias')
const options = ref([
  {
    id: '7dias',
    label: '7 dias',
    range: 7,
  },
  {
    id: '14dias',
    label: '14 dias',
    range: 14,
  },
  {
    id: '1mes',
    label: '1 mes',
    range: 30,
  },
  {
    id: '2meses',
    label: '2 meses',
    range: 60,
  },
  {
    id: '3meses',
    label: '3 meses',
    range: 90,
  },
])

const onRangeClick = (id: string, range: number) => {
  preselectedDate.value = id
  const fulldate = getRangeDate(range)
  store.onDateChange(fulldate)
}
</script>
