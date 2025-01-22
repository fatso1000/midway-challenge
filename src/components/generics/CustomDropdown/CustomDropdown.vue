<template>
  <div :className="`dropdown ${align}`">
    <div tabIndex="{0}" role="button" className="m-1 inline-flex gap-1">
      <div v-if="avatar" className="avatar">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div class="flex flex-col" :class="avatar ? 'max-sm:hidden' : ''">
        <span>{{ title }}</span
        ><strong v-if="subtitle">{{ subtitle }}</strong>
      </div>
      <div class="my-auto" :class="avatar ? 'max-sm:hidden' : ''">
        <Icon icon="iconamoon:arrow-down-2-thin" width="24" height="24" />
      </div>
    </div>
    <ul
      tabIndex="{0}"
      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
    >
      <slot />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
defineProps<{
  title: string
  subtitle?: string
  avatar?: boolean
  align?: 'dropdown-left'
}>()
</script>
