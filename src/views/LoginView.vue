<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'

const authStore = useAuthStore()
const isLoading = ref(false)
const error = ref<string | null>(null)

const form = ref({
  username: '',
  password: '',
})

const handleLogin = () => {
  if (!form.value.username || !form.value.password) {
    alert('Mohon isi username dan password')
    return
  }

  try {
    isLoading.value = true
    authStore.login(form.value)
  } catch (err: any) {
    error.value = err.message || 'Login gagal. Periksa kembali username dan password Anda.'
  } finally {
    isLoading.value = false
  }
}

const loginPageStyle = {
  backgroundColor: '#FEF2F2',
  backgroundImage:
    'linear-gradient(rgba(214, 40, 40, 0.07) 1px, transparent 1px), linear-gradient(to right, rgba(214, 40, 40, 0.07) 1px, transparent 1px)',
  backgroundSize: '3rem 3rem',
}

const formCardStyle = {
  backgroundColor: 'white',
  backgroundImage: `
      linear-gradient(to bottom, rgba(214, 40, 40, 0.2), transparent 30%),
      linear-gradient(rgba(214, 40, 40, 0.07) 1px, transparent 1px),
      linear-gradient(to right, rgba(214, 40, 40, 0.07) 1px, transparent 1px)
    `,
  backgroundSize: '100% 100%, 3rem 3rem, 3rem 3rem',
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4" :style="loginPageStyle">
    <div class="rounded-2xl shadow-xl p-8 max-w-sm w-full" :style="formCardStyle">
      <div class="text-center mb-8">
        <p class="text-red-100 font-bold">Koperasi POS</p>
        <h1 class="text-3xl font-bold text-secondary mt-2">Selamat Datang Kembali</h1>
        <p class="text-gray-500 mt-3 text-sm">
          Silakan masukkan username dan password untuk masuk.
        </p>
      </div>
      <form @submit.prevent="handleLogin" novalidate>
        <div v-if="error" class="mb-4 text-center text-red-600 bg-red-100 p-3 rounded-lg text-sm">
          {{ error }}
        </div>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2"
            >Username</label
          >
          <input
            id="username"
            type="text"
            v-model="form.username"
            placeholder="Username"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            required
            :disabled="isLoading"
          />
        </div>
        <div class="mb-8">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              required
              :disabled="isLoading"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
              :disabled="isLoading"
            >
              <EyeOffIcon v-if="showPassword" class="h-5 w-5" />
              <EyeIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primry-light transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Memproses...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>