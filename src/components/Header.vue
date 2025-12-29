<script setup lang="ts">
import { Menu, LogOut, User } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const emit = defineEmits(['toggleSidebar'])

const handleLogout = () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    authStore.logout()
  }
}
</script>

<template>
  <header
    class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm"
  >
    <button @click="emit('toggleSidebar')" class="text-gray-500 hover:text-gray-700 lg:hidden">
      <Menu :size="24" />
    </button>

    <div class="flex items-center ml-auto space-x-4">
      <div class="flex items-center text-sm text-gray-600">
        <div
          class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2"
        >
          <User :size="18" />
        </div>
        <span class="hidden md:block font-medium">Administrator</span>
      </div>

      <button
        @click="handleLogout"
        class="flex items-center px-3 py-1 text-sm font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
      >
        <LogOut :size="16" class="mr-2" />
        Logout
      </button>
    </div>
  </header>
</template>