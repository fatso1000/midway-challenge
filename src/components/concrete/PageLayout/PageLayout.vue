<template>
  <div class="drawer xl:drawer-open h-screen">
    <input id="left-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col overflow-hidden">
      <div class="navbar border-b p-2 min-h-16 max-h-16">
        <div class="flex-none">
          <label for="left-drawer" class="btn btn-ghost drawer-button xl:hidden">
            <Icon icon="tabler:menu-2" width="24" height="24" />
          </label>
        </div>
        <div class="flex-1 pl-4 justify-between w-full">
          <Dropdown subtitle="Mob test" title="Proyectos" />
          <Dropdown subtitle="Administrador" title="Renzo Monteleone" :avatar="true" />
        </div>
      </div>

      <div class="drawer xl:drawer-open w-full" style="height: calc(100svh - 64px)">
        <input id="inner-drawer" type="checkbox" class="drawer-toggle" />
        <div
          class="drawer-content flex flex-col overflow-y-auto bg-base-200"
          style="height: calc(100svh - 64px)"
        >
          <!-- CONTENT -->
          <slot />
        </div>

        <div class="drawer-side">
          <label for="inner-drawer" class="drawer-overlay"></label>
          <ul class="menu p-4 w-48 h-full text-base text-base-content border-r bg-base-100">
            <li class="mt-2">
              <a href="#"><strong>Reportes</strong></a>
            </li>
            <li><a href="#">Ventas</a></li>
            <li><a href="#">RFM</a></li>
            <li><a href="#">Campanas</a></li>
            <li><a href="#">Personalizaciones</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="drawer-side">
      <label for="left-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-48 h-full bg-base-content text-base text-base-300/60">
        <li class="mb-6">
          <a href="#" class="pl-0"><img :src="Logo" /><strong>Midway</strong></a>
        </li>
        <li className="menu-title text-base-300/60 text-xs pl-0">MENU</li>
        <li>
          <SidebarButton
            ><Icon
              icon="tabler:layout-grid-filled"
              width="24"
              height="24"
            />Dashboard</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon
              icon="mingcute:drawing-board-fill"
              width="24"
              height="24"
            />Reportes</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon
              icon="flowbite:users-group-solid"
              width="24"
              height="24"
            />Audiencia</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon icon="solar:palette-bold" width="24" height="24" />Diseno</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon icon="tabler:list-details" width="24" height="24" />Contenido</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon icon="tabler:speakerphone" width="24" height="24" />Campanas</SidebarButton
          >
        </li>
        <li className="menu-title text-base-300/60 text-xs mt-auto pl-0">PROYECTO</li>
        <li>
          <SidebarButton
            ><Icon icon="solar:settings-bold" width="24" height="24" />Preferencias</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon icon="majesticons:key" width="24" height="24" />Canales</SidebarButton
          >
        </li>
        <li>
          <SidebarButton
            ><Icon icon="ion:cube" width="24" height="24" />Integraciones</SidebarButton
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import Logo from '../../../assets/midway-logo.png'
import Dropdown from '@/components/generics/CustomDropdown/CustomDropdown.vue'
import SidebarButton from '@/components/generics/SidebarButton/SidebarButton.vue'
</script>
