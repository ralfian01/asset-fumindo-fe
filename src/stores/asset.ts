import { defineStore } from 'pinia';
import axios from 'axios';

export interface Asset {
    asset_id: number;
    asset_name: string;
    stock_quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string | null;
}

export const useAssetStore = defineStore('asset', {
    state: () => ({
        assets: [] as Asset[],
        loading: false,
        error: null as string | null
    }),

    actions: {

        // Get asset data list
        async fetchAssets() {
            this.loading = true;
            this.error = null;

            try {
                const token = sessionStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL;

                const response = await axios.get(`${apiUrl}/manage/assets`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.status === 'SUCCESS') {
                    this.assets = response.data.data;
                } else {
                    this.error = "Gagal mengambil data aset.";
                }

            } catch (err: any) {
                console.error("Error fetching assets:", err);
                this.error = err.response?.data?.description || "Terjadi kesalahan koneksi server.";
            } finally {
                this.loading = false;
            }
        },

        // Fetch / get asset by id (return only 1 data)
        async fetchAssetById(id: string | number) {
            this.loading = true;
            this.error = null;
            this.singleAsset = null;

            try {
                const token = sessionStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL;

                // Endpoint target: GET /manage/assets/:id
                const response = await axios.get(`${apiUrl}/manage/assets/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.status === 'SUCCESS') {
                    this.singleAsset = response.data.data;
                    return this.singleAsset;
                } else {
                    throw new Error("Data tidak ditemukan");
                }
            } catch (err: any) {
                console.error("Error fetching detail:", err);
                this.error = "Gagal mengambil detail aset.";
                return null;
            } finally {
                this.loading = false;
            }
        },

        // Insert new data asset
        async createAsset(payload: { asset_name: string; stock_quantity: number; category: string; }) {
            this.loading = true;
            this.error = null;

            try {
                const token = sessionStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL;

                const response = await axios.post(`${apiUrl}/manage/assets`, payload, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Sesuaikan auth method
                    }
                });

                if (response.data.status === 'SUCCESS') {
                    return true;
                } else {
                    throw new Error(response.data.description || "Gagal menambah aset");
                }

            } catch (err: any) {
                console.error("Error creating asset:", err);
                this.error = err.response?.data?.description || err.message || "Terjadi kesalahan server.";
                return false;
            } finally {
                this.loading = false;
            }
        },

        // Update asset
        async updateAsset(id: string | number, payload: any) {
            this.loading = true;
            this.error = null;

            try {
                const token = sessionStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL;

                const response = await axios.patch(`${apiUrl}/manage/assets/${id}`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.status === 'SUCCESS') {
                    return true;
                } else {
                    throw new Error(response.data.description || "Gagal update aset");
                }
            } catch (err: any) {
                console.error("Error updating:", err);
                this.error = err.response?.data?.description || "Gagal menyimpan perubahan.";
                return false;
            } finally {
                this.loading = false;
            }
        },

        // Delete asset
        async deleteAsset(id: number) {

            try {
                const token = sessionStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL;

                const response = await axios.delete(`${apiUrl}/manage/assets/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.status === 'SUCCESS') {
                    this.assets = this.assets.filter(asset => asset.asset_id !== id);
                    return true;
                } else {
                    throw new Error(response.data.description || "Gagal menghapus aset");
                }

            } catch (err: any) {
                console.error("Error deleting asset:", err);
                this.error = err.response?.data?.description || "Gagal menghapus data.";
                return false;
            }
        }

    }
});