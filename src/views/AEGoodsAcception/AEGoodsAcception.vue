<script lang="ts" setup >
import type { AxiosError } from 'axios'
import BaseIcon from '@/components/BaseIcon.vue'
import AEScanner from '@/components/AEScanner.vue'
import AEActionToTxt from './AEActionToTxt.vue'
import AEGoodSelect from './AEGoodSelect.vue'

import { computed, ref } from 'vue'
import { getDoc, getItem } from '@/api'

type ScanningType = 'documents' | 'goods'
interface DocInfo {
  iddoc: string
  doc_name: string
  [key: string]: unknown
}

const scannerVisible = ref<boolean>(false)
const goodsSelectorVisible = ref<boolean>(false)

const activeScanningType = ref<ScanningType | null>(null)

const docsData = ref<DocInfo | null>(null)
const goodsData = ref<string[] | null>(null)
const goodsSelectedItem = ref<string>('')

const error = ref<string>('')

const scannedVal = ref<string>('') // todo !!!удалить потом все упоминания, сейчас для тестов

async function onScan(barcode: string) {
  try {
    if (activeScanningType.value === 'documents') {
      const response = await getDoc({ barcode })
      if (barcode === '4895117884973') {
        docsData.value = response
        console.log(response)
      } else {
        error.value = `Не удалось получить данные ${barcode}`
        scannerVisible.value = false
      }
    }
    if (activeScanningType.value === 'goods') {
      const response = await getItem({ barcode, iddoc: docsData.value?.iddoc as string })
      if (barcode === '4895117884973') {
        goodsData.value = response

        if (response.length > 1) {
          goodsSelectorVisible.value = true
        } else {
          // todo оставить это и удалить ниже goodsSelectedItem.value = response.data.DATA[0]
        }
        console.log(response)
      } else {
        goodsSelectedItem.value = `response.data.DATA[0] ${barcode}`
        error.value = `Не удалось получить данные`
        scannerVisible.value = false
      }
    }
    scannedVal.value = barcode // todo удалить после тестов
  } catch (err) {
    const er = err as AxiosError
    console.error(err)
    error.value = `${er?.message || err}`
  } finally {
    activeScanningType.value = null
    scannerVisible.value = false
  }
}

function removeItem(item: ScanningType) {
  if (item === 'documents') {
    docsData.value = null
  }
  if (item === 'goods') {
    goodsData.value = null
    goodsSelectedItem.value = ''
  }
}

function startScanner(scanType: ScanningType) {
  if (!docsData.value?.iddoc && scanType === 'goods') {
    error.value = `Сначала отсканиурйте документ`
    return
  }
  error.value = ''
  activeScanningType.value = scanType
  scannerVisible.value = true
}

function scannerErrorHandler(err: string) {
  scannerVisible.value = false
  error.value = err
}

function selectGood(good: string) {
  goodsSelectedItem.value = good
  goodsSelectorVisible.value = false
}

const computedDocInfo = computed(() => {
  return docsData.value
    ? `${docsData.value.doc_name || scannedVal.value + '(тест, сканированный код)'} ${
        docsData.value.iddoc
      }`
    : ''
})
</script>

<template>
  <div class="ae-acception">
    <div class="container ae-acception__container">
      <h2 class="ae-title-21 ae-acception__title">Приемка товара</h2>
      <div v-if="scannerVisible" class="ae-acception__scanner">
        <AEScanner title="Отсканируйте документ" @onScan="onScan" @onError="scannerErrorHandler" />
      </div>
      <div v-else class="ae-acception__items">
        <AEActionToTxt
          class="ae-acception__action-to-txt"
          @btn-click="startScanner('documents')"
          @remove="removeItem('documents')"
          title="Документ"
          :info="computedDocInfo"
        />
        <AEActionToTxt
          class="ae-acception__action-to-txt"
          @btn-click="startScanner('goods')"
          @remove="removeItem('goods')"
          title="Товар"
          :info="goodsSelectedItem"
        />
        <div v-if="error" class="ae-acception__error">
          {{ error }}
        </div>
        <AEGoodSelect v-if="goodsSelectorVisible" @btn-click="selectGood" :items="goodsData" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
.ae-acception {
  width: 100%;
  height: 100%;
  &__title {
    margin-bottom: 42px;
  }
  &__container {
    height: 100%;
  }
  &__action-to-txt {
    &:first-child {
      margin-bottom: 24px;
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
