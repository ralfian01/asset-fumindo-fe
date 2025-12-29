<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'

const auth = useAuth()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen bg-light-bg font-sans text-gray-800" style="background: white">
    <Sidebar @logout="handleLogout" />
    <main class="flex-1 flex flex-col overflow-hidden">
      <slot />
    </main>
  </div>
</template>
