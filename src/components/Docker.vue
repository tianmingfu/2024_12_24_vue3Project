<template>
  <Toast ref="toastRef" />
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{ docker__item: true, 'docker__item--active': index === currentIndex }"
      :key="item.icon"
      @click="tababrClick(index)"
    >
      <div class="iconfont" v-html="item.icon" />
      <div class="docker__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import Toast from '../components/Toast.vue'
import { useRouter } from 'vue-router'

const toastRef = ref(null)

const router = useRouter()

const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0,
  },
})

const currentIndex = defineModel('currentIndex')

let dockerList = ref([
  { icon: '&#xe713;', text: '首页' },
  { icon: '&#xe714;', text: '购物车' },
  { icon: '&#xe716;', text: '订单' },
  { icon: '&#xe716;', text: '我的' },
])
const tababrClick = (index) => {
  console.log(index)
  // props.currentIndex = index
  toastRef.value.showToast('点击了第' + (index + 1) + '个tab', 1500)

  let path = 'Home'
  if (index === 1) {
    path = 'Text'
  } else if (index === 2) {
    path = 'OrderList'
  } else if (index === 3) {
    path = 'PersonalInfo'
  }
  router.replace({ name: path })
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
@use '../style/viriables.scss' as vars; // 需要命名空间

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid vars.$content-bgColor;
  color: vars.$content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
