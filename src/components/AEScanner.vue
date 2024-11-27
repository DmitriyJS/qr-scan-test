<template>
  <div class="scanner-wrapper">
    <div class="ae-title-21">
      {{ title }}
    </div>
    <div id="ae-scanner" class="ae-scanner"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, defineEmits } from 'vue'
import { ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const emits = defineEmits(['onScan', 'onError'])

defineProps<{
  title?: string
}>()

let scanner: Html5Qrcode | null = null
const scanerInited = ref<boolean>(false)
const containerId = 'ae-scanner'

function startScanner() {
  scanner = new Html5Qrcode(containerId)
  const config = { fps: 20, qrbox: { width: 230, height: 230 } }

  scanner
    .start(
      { facingMode: 'environment' }, // Камера устройства
      config,
      (decodedResult) => {
        console.log('Декодированный текст:', decodedResult)
        emits('onScan', decodedResult)
        stopScanner()
      },
      (/*error*/) => {}
    )
    .then(() => {
      scanerInited.value = true
    })
    .catch((err) => {
      emits('onError', `Ошибка инициализации сканера: ${err}`)
      console.error('Ошибка инициализации сканера:', err)
    })
}

function stopScanner() {
  if (scanerInited.value) {
    scanner?.stop().then(() => {
      console.log('Сканер остановлен')
    })
    scanerInited.value = false
  }
}

onMounted(() => {
  startScanner()
})

onBeforeUnmount(() => {
  stopScanner()
})
</script>

<style lang="scss" scoped>
.scanner-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .ae-title-21 {
    white-space: pre-line;
  }
}
#ae-scanner {
  background: green;
  width: 100%;
  max-width: 380px;
  margin: 8px auto 0px auto;
}
</style>
