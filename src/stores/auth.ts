// src/stores/auth.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // Ambil token dari storage jika user refresh halaman
        token: sessionStorage.getItem('token') || null,
        user: null as any,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async login(payload: any) {
            this.loading = true;
            this.error = null;

            try {
                // 1. Buat string Basic Auth (format: "username:password")
                const credentials = `${payload.username}:${payload.password}`;

                // 2. Encode ke Base64 (Syarat wajib Basic Auth)
                const encodedCredentials = btoa(credentials);

                const apiUrl = import.meta.env.VITE_API_URL;

                // 3. Panggil API
                // Ganti 'http://api.fumindo.com' dengan URL API asli Anda
                const response = await axios.post(`${apiUrl}/auth/account`, {}, {
                    headers: {
                        'Authorization': `Basic ${encodedCredentials}`
                    }
                });

                // 4. Sukses: Simpan Token (Asumsi response body ada token)
                // Sesuaikan 'response.data.token' dengan struktur JSON API Anda
                const token = response.data.token || encodedCredentials; // Fallback jika API tidak return token baru

                this.token = token;
                sessionStorage.setItem('token', token);

                // 5. Redirect ke Dashboard
                router.push('/');

            } catch (err: any) {

                console.error("Login Failed:", err);

                if (err.response && err.response.status === 401) {
                    this.error = "Username atau Password salah.";
                } else {
                    this.error = "Terjadi kesalahan pada server.";
                }
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            sessionStorage.removeItem('token');
            router.push('/login');
        }
    }
});