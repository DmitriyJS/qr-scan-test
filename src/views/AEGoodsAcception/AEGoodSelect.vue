<script lang="ts" setup >
// компонент для выбора тоавра, если их было больше 1го в ответе
import { defineEmits, ref } from 'vue'
const emits = defineEmits(['btn-click'])

defineProps<{
  items: string[]
}>()

const chosenItem = ref<string>('')
</script>

<template>
  <div class="ae-good-select">
    <div class="ae-title-21">Выберите нужный тоавр</div>
    <div class="ae-good-select__content">
      <div class="ae-good-select__items">
        <div
          class="ae-good-select__item"
          :class="{ 'ae-good-select__item__active': item === chosenItem }"
          @click="chosenItem = item"
          :key="item"
          v-for="item in items"
        >
          {{ item }}
        </div>
      </div>
      <button @click="emits('btn-click', chosenItem)" class="ae-btn ae-btn__blue">Выбрать</button>
    </div>
  </div>
</template>

<style scoped lang="scss" >
.ae-good-select {
  height: calc(100% - 82px);
  width: 100%;
  position: fixed;
  top: 82px;
  left: 0px;
  background: #fff;

  .ae-title-21 {
    margin-bottom: 45px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 70px);
  }

  &__items {
    max-height: 80%;
    overflow-y: scroll;
  }

  &__item {
    padding: 16px 24px;
    border-bottom: 1px solid #696969;
    background: #fff;
    line-height: 25px;
    transition: 0.2s;
    &:first-child {
      border-top: 1px solid #696969;
    }

    &__active {
      background-color: rgba(91, 177, 75, 0.1);
    }
  }

  button {
    margin: 8px 24px 16px 24px;
  }
}
</style>
