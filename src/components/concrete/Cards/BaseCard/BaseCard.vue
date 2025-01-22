<template>
  <div class="card bg-base-100 border" :class="cardClasses">
    <CardSpinner v-if="isLoading" />
    <div v-else class="card-body md:p-4 xl:p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardSpinner from '@/components/generics/CardSpinner/CardSpinner.vue'

defineProps<{
  isLoading: boolean
  cardClasses?: string
}>()
</script>
