<template>
  <div class="text">
    <p>这是商铺文字介绍页面</p>
  </div>
  <Docker :currentIndex="1" />
</template>
<script setup>
import Docker from '../../components/Docker.vue'

import { onMounted, reactive, toRefs } from 'vue'
onMounted(() => {
  console.log('shop text')
})
</script>
