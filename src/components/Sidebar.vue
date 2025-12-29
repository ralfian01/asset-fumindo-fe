<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LayoutDashboard, Box, X } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
      @click="emit('close')"
    ></div>

    <!-- Sidebar Main -->
    <aside
      class="fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo Area -->
      <div class="flex items-center justify-between h-16 px-6 bg-slate-800">
        <span class="text-xl font-bold tracking-wider">FumindoApp</span>
        <button @click="emit('close')" class="lg:hidden text-gray-400 hover:text-white">
          <X :size="24" />
        </button>
      </div>

      <!-- Menu Navigation -->
      <nav class="mt-5 px-4 space-y-2">
        <RouterLink
          to="/"
          class="flex items-center px-4 py-3 text-gray-300 transition-colors rounded-lg hover:bg-slate-800 hover:text-white"
          active-class="bg-blue-600 text-white shadow-lg"
        >
          <LayoutDashboard :size="20" class="mr-3" />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/assets"
          class="flex items-center px-4 py-3 text-gray-300 transition-colors rounded-lg hover:bg-slate-800 hover:text-white"
          active-class="bg-blue-600 text-white shadow-lg"
        >
          <Box :size="20" class="mr-3" />
          Data Aset
        </RouterLink>
      </nav>
    </aside>
  </div>
</template>