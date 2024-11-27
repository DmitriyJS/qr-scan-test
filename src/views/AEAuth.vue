<template>
  <div class="ae-auth">
    <div class="container ae-auth__container">
      <div class="ae-auth__content">
        <div class="ae-auth__scanner" v-if="scannerVisible">
          <AEScanner
            :title="`Отсканируйте \n штрихкод сотрудника`"
            @onScan="auth"
            @onError="scannerErrorHandler"
          />
        </div>
        <div v-else class="btn-wrapper">
          <button class="ae-auth__btn ae-btn__blue ae-btn" @click="openScanner">
            <span>Авторизоваться</span> <BaseIcon name="qr" size="28" />
          </button>
          <div v-if="error" class="ae-auth__error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AxiosError } from 'axios'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getAuth } from '@/api'
import { setUserDataCookie } from '@/utils/cookiesHandler'
import { useAuthStore } from '@/stores/main'

import BaseIcon from '@/components/BaseIcon.vue'
import AEScanner from '@/components/AEScanner.vue'

const authStore = useAuthStore()
const scannerVisible: Ref<boolean> = ref(false)
const error: Ref<string> = ref('')
const router = useRouter()

async function auth(barcode: string) {
  console.log(`cod in auth`, barcode)
  try {
    const response = await getAuth({
      barcode: `656565656566565`, // todo удалить это значение
    })
    if (barcode === '4895117884973') {
      authStore.setUser(response)
      setUserDataCookie(response)
      console.log(response)

      router.push(`/`)
    } else {
      error.value = `Сотрудник не найден`
      scannerVisible.value = false
    }
  } catch (err) {
    const er = err as AxiosError
    console.error(err)
    error.value = `Сотрудник не найден. ${er?.message || err}`
    scannerVisible.value = false
  }
}

function openScanner() {
  error.value = ``
  scannerVisible.value = true
}

function scannerErrorHandler(err: string) {
  scannerVisible.value = false
  error.value = err
}
</script>

<style lang="scss" scoped>
.ae-auth {
  height: 100%;
  &__container {
    height: 100%;
  }
  &__content {
    width: 100%;
    min-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__scanner {
    height: 100%;
    width: 100%;
  }

  .btn-wrapper {
    width: 100%;
  }

  &__btn {
    width: 100%;
    span {
      margin-right: 16px;
    }
  }

  &__error {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: #ed3333;
    margin-top: 23px;
  }
}
</style>
