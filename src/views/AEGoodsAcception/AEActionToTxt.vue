<script lang="ts" setup >
import BaseIcon from '@/components/BaseIcon.vue'

defineProps<{
  title: string
  info?: string | undefined | null
}>()
</script>

<template>
  <div class="ae-action-to-txt">
    <div v-if="info" class="ae-action-to-txt__info">
      <div class="ae-action-to-txt__info__l ae-title-21">{{ title }}:</div>
      <div class="ae-action-to-txt__info__r">
        <div class="ae-action-to-txt__info__r__txt">
          {{ info }}
        </div>
        <div class="ae-action-to-txt__info__right__remove" @click="$emit('remove')">
          <BaseIcon name="cross" size="22" />
        </div>
      </div>
    </div>
    <button v-else @click="$emit('btn-click')" class="ae-action-to-txt__btn ae-btn ae-btn__blue">
      <span>{{ title }}</span> <BaseIcon name="qr" size="28" />
    </button>
  </div>
</template>

<style lang="scss" >
.ae-action-to-txt {
  width: 100%;
  height: 100%;

  &__btn {
    width: 100%;
    display: flex;
    gap: 25px;
    span {
      min-width: 110px;
    }
  }

  &__info {
    display: flex;
    gap: 26px;
    border: 1px solid green;
    .ae-title-21 {
      min-width: 100px;
      text-align: left;
    }
    &__r {
      width: 100%;
      display: flex;
      justify-content: space-between;
      &__txt {
        padding-top: 4px;
      }
      svg {
        color: #696969;
      }
    }
  }
}
</style>
