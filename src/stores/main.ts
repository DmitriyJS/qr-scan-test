import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/index'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  function setUser(data: User | null) {
    user.value = data
  }
  const isAuth = computed(() => {
    if (user.value?.name && user.value?.worker_id) return true
    else return false
  })
  return { user, isAuth, setUser }
})
