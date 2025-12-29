<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- RouterView adalah "lubang" dinamis. 
       Di sini nanti akan muncul LoginView atau DashboardView 
       tergantung URL dan logika router Anda. -->
  <RouterView />
</template>

<style>
/* 
   Reset CSS sederhana agar halaman menggunakan tinggi penuh.
   Style spesifik per halaman sebaiknya ditaruh di masing-masing file .vue 
*/
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>