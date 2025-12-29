<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAssetStore } from '@/stores/asset'
import { Save, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const assetStore = useAssetStore()

const form = ref({
  asset_name: '',
  stock_quantity: 1,
  category: 'CONSUMABLES',
})

const categories = [
  { value: 'CONSUMABLES', label: 'Barang Habis Pakai' },
  { value: 'NON_CONSUMABLES', label: 'Barang Tidak Habis Pakai' },
]

const handleSubmit = async () => {
  if (!form.value.asset_name) {
    alert('Nama aset wajib diisi')
    return
  }

  const success = await assetStore.createAsset(form.value)

  if (success) {
    router.push('/assets')
  }
}
</script>

<template>
  <div class="mx-auto space-y-6">
    <!-- Header with back button -->
    <div class="flex items-center gap-4">
      <button
        @click="router.back()"
        class="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
      >
        <ArrowLeft :size="24" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Tambah Aset Baru</h1>
        <p class="text-gray-500 text-sm">Isi formulir di bawah untuk mendaftarkan aset.</p>
      </div>
    </div>

    <!-- Alert Error Global -->
    <div v-if="assetStore.error" class="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
      <p class="font-bold">Gagal Menyimpan</p>
      <p>{{ assetStore.error }}</p>
    </div>

    <!-- Form Card -->
    <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2"
            >Nama Aset <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.asset_name"
            type="text"
            placeholder="Contoh: Laptop Dell XPS"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">Kategori</label>
            <div class="relative">
              <select
                v-model="form.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-white"
              >
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                  {{ cat.label }}
                </option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2">Jumlah Stok</label>
            <input
              v-model.number="form.stock_quantity"
              type="number"
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            @click="router.back()"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Batal
          </button>

          <button
            type="submit"
            :disabled="assetStore.loading"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-900 transition flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="assetStore.loading"
              class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
            ></span>
            <Save v-else :size="18" />
            {{ assetStore.loading ? 'Menyimpan...' : 'Simpan Aset' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>