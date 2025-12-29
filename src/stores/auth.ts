// src/stores/auth.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
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
                const credentials = `${payload.username}:${payload.password}`;

                const encodedCredentials = btoa(credentials);

                const apiUrl = import.meta.env.VITE_API_URL;

                const response = await axios.post(`${apiUrl}/auth/account`, {}, {
                    headers: {
                        'Authorization': `Basic ${encodedCredentials}`
                    }
                });

                const token = response.data.data.token || encodedCredentials;

                this.token = token;
                sessionStorage.setItem('token', token);

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