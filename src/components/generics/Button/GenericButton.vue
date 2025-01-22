<template>
  <button v-on:click="onClick" :className="buttonClass">
    <span v-if="text">{{ text }}</span>
    <Icon v-if="!!icon" :icon="icon" width="18" height="18"></Icon>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps<{
  text?: string
  icon?: string
  color?: string
  isOutlined?: boolean
  isSquare?: boolean
  selected?: boolean
  size?: 'sm' | 'xs' | 'lg'
  onClick?: (payload: MouseEvent) => void
}>()

const colorButton = computed(() => (props.color ? `btn-${props.color}` : ''))
const outlined = computed(() => (props.isOutlined ? 'btn-outline' : ''))
const square = computed(() => (props.isSquare ? 'btn-square' : ''))
const buttonSize = computed(() => (props.size ? `btn-${props.size}` : ''))
const buttonClass = computed(() =>
  props.selected
    ? `btn bg-accent text-base-100 hover:bg-accent/60`
    : `btn ${colorButton.value} ${square.value} ${outlined.value} ${buttonSize.value}`,
)
</script>
