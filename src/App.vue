<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getUserDataFromCookies } from '@/utils/cookiesHandler'
import AEHEader from './components/AEHEader.vue'
import { loadIcons } from '@/utils/icons'
import { useAuthStore } from '@/stores/main'

loadIcons() // спрайты для иконок

// помещаем данные о юзере в стор, если залогинен
const authStore = useAuthStore()
const userData = getUserDataFromCookies('userData')
if (userData) {
  authStore.setUser(userData)
}
</script>

<template>
  <AEHEader />
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
/* @import '@/assets/styles/main.scss'; */
</style>
