<script setup lang="ts">
import { onMounted } from 'vue'
import { useAssetStore } from '@/stores/asset'
import { Plus, Search, Edit, Trash2, Box, RefreshCcw } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const assetStore = useAssetStore()

onMounted(() => {
  assetStore.fetchAssets()
})

const categoryName = (string_code: string) => {
  if (string_code == 'CONSUMABLES') return 'Habis pakai'
  if (string_code == 'NON_CONSUMABLES') return 'Tidak habis pakai'
}

const handleDelete = async (id: number, name: string) => {
  const isConfirmed = confirm(
    `Apakah Anda yakin ingin menghapus aset "${name}"? Data yang dihapus tidak bisa dikembalikan.`
  )

  if (!isConfirmed) return

  const success = await assetStore.deleteAsset(id)

  if (success) {
    // alert('Berhasil dihapus')
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Page -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Daftar Aset</h1>
        <p class="text-gray-500 text-sm">Kelola semua inventaris aset di sini</p>
      </div>
      <RouterLink
        to="/assets/create"
        class="bg-primary hover:bg-red-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
      >
        <Plus :size="18" />
        Tambah Aset
      </RouterLink>
    </div>

    <!-- Toolbar & Search -->
    <div
      class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4"
    >
      <div class="relative flex-1">
        <Search
          :size="20"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Cari nama aset atau kategori..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        @click="assetStore.fetchAssets()"
        class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
        title="Refresh Data"
      >
        <RefreshCcw :size="18" :class="{ 'animate-spin': assetStore.loading }" />
      </button>
    </div>

    <!-- Alert Error -->
    <div v-if="assetStore.error" class="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
      <p class="font-bold">Error</p>
      <p>{{ assetStore.error }}</p>
    </div>

    <!-- Data table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <!-- Loading State -->
      <div v-if="assetStore.loading" class="p-8 text-center text-gray-500">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"
        ></div>
        <p>Memuat data aset...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="assetStore.assets.length === 0"
        class="p-12 text-center flex flex-col items-center"
      >
        <div class="bg-gray-100 p-4 rounded-full mb-4">
          <Box :size="48" class="text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900">Belum ada data aset</h3>
        <p class="text-gray-500 mt-1">Silakan tambahkan aset baru terlebih dahulu.</p>
      </div>

      <!-- Table Content -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Aset
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kategori
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stok
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="asset in assetStore.assets"
              :key="asset.asset_id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ asset.asset_name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  {{ categoryName(asset.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900 font-medium">{{ asset.stock_quantity }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <RouterLink
                  :to="`/assets/edit/${asset.asset_id}`"
                  class="text-indigo-600 hover:text-indigo-900 mr-3 inline-block"
                  title="Edit"
                >
                  <Edit :size="18" />
                </RouterLink>
                <button
                  @click="handleDelete(asset.asset_id, asset.asset_name)"
                  class="text-red-600 hover:text-red-900"
                  title="Hapus"
                >
                  <Trash2 :size="18" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>