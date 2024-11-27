<template>
  <header class="ae-header">
    <div class="container ae-header__container">
      <div
        v-if="exitBarVisible && userData.isAuth"
        class="ae-header__exit-bar ae-header__body"
        @click="exitBarVisible = false"
      >
        <div class="ae-header__user">{{ userData?.user?.name }}</div>
        <button @click.stop="logOut" class="ae-header__exit-btn">
          Выйти<BaseIcon name="exit" />
        </button>
      </div>
      <div v-else class="ae-header__content ae-header__body">
        <div class="ae-logo">
          <div class="logo__img"></div>
        </div>
        <div
          v-if="userData.user"
          class="ae-header__user ae-header__user__align-right"
          @click="exitBarVisible = true"
        >
          {{ userData.user.name }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logo from '@/assets/Icons/logo.svg'
import BaseIcon from '@/components/BaseIcon.vue'

import { useAuthStore } from '@/stores/main'
import { deleteCookie } from '@/utils/cookiesHandler'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = useAuthStore()

function logOut() {
  userData.setUser(null)
  deleteCookie(`userData`)
  exitBarVisible.value = false
  router.push(`/auth`)
}
const exitBarVisible = ref(false)
</script>

<style scoped lang="scss" >
.ae-header {
  margin-bottom: 16px;
  &__container {
    height: 66px;
    padding: 0px;
  }
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 24px;
  }

  &__user {
    font-size: 16px;
    font-weight: 600;
    color: $cl-blue;
    &__align-right {
      text-align: right;
    }
  }

  &__exit-bar {
    box-shadow: 0px 4px 25px 0px #00000040;
    .ae-header__user {
      color: #696969;
    }
  }

  &__exit-btn {
    display: flex;
    align-items: center;
    font-size: 15px;
    gap: 8px;
    color: #696969;
  }
  .ae-logo {
    .logo__img {
      width: 200px;
      height: 34px;
      background: #00218a;
      border-radius: 20px;
      object-fit: cover;
      background-image: url('https://e7.pngegg.com/pngimages/82/301/png-clipart-qr-code-barcode-graphics-organization-qr-code-maker-text-logo.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-repeat: repeat-x;
      background-position: center;
    }
  }
}
</style>
