<template>
  <div v-if="show" class="toast">{{ message }}</div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const toastData = reactive({
  show: false,
  message: '',
})
const { show, message } = toRefs(toastData)
function showToast(message, duration = 2000) {
  toastData.show = true
  toastData.message = message
  setTimeout(() => {
    toastData.show = false
    toastData.message = ''
  }, duration)
}

defineExpose({
  showToast,
})
</script>

<style lang="scss" scoped>
@use '../style/viriables.scss' as vir;
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: vir.$bgColor;
}
</style>
