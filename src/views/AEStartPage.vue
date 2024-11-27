<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="ae-start-page">
    <div class="container ae-start-page__container">
      <div class="btns-wrapper">
        <button class="ae-btn__blue ae-btn" @click="router.push('/goods-acception')">
          Приемка товара
        </button>
        <button disabled class="ae-btn" @click="router.push('/cars-send')">Отправка машин</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ae-start-page {
  height: 100%;
  &__container {
    height: 100%;
    display: flex;
    align-items: center;

    .btns-wrapper {
      width: 100%;
    }
  }
  button {
    width: 100%;
    &:first-child {
      margin-bottom: 26px;
    }
  }
}
</style>