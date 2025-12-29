<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAssetStore } from '@/stores/asset'
import { Save, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const assetStore = useAssetStore()

const assetId = route.params.id as string

const form = ref({
  asset_name: '',
  stock_quantity: 0,
  category: '',
})

const categories = [
  { value: 'CONSUMABLES', label: 'Barang Habis Pakai' },
  { value: 'NON_CONSUMABLES', label: 'Barang Tidak Habis Pakai' },
]

onMounted(async () => {
  const data = await assetStore.fetchAssetById(assetId)

  if (data) {
    form.value = {
      asset_name: data.asset_name,
      stock_quantity: data.stock_quantity,
      category: data.category,
    }
  } else {
    alert('Data aset tidak ditemukan')
    router.push('/assets')
  }
})

const handleUpdate = async () => {
  if (!form.value.asset_name) return alert('Nama wajib diisi')

  const success = await assetStore.updateAsset(assetId, form.value)

  if (success) {
    router.push('/assets')
  }
}
</script>

<template>
  <div class="mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <button
        @click="router.back()"
        class="p-2 rounded-full hover:bg-gray-200 transition text-gray-600"
      >
        <ArrowLeft :size="24" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Edit Aset</h1>
        <p class="text-gray-500 text-sm">Perbarui informasi aset</p>
      </div>
    </div>

    <!-- Loading fetch -->
    <div v-if="assetStore.loading && !form.asset_name" class="text-center py-10">
      <span
        class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
      ></span>
      <p class="mt-2 text-gray-500">Mengambil data...</p>
    </div>

    <div v-else class="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <form @submit.prevent="handleUpdate" class="space-y-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2">Nama Aset</label>
          <input
            v-model="form.asset_name"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">Kategori</label>
            <div class="relative">
              <select
                v-model="form.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                  {{ cat.label }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2">Stok</label>
            <input
              v-model.number="form.stock_quantity"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            @click="router.back()"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            type="submit"
            :disabled="assetStore.loading"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-900 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Save v-if="!assetStore.loading" :size="18" />
            {{ assetStore.loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>