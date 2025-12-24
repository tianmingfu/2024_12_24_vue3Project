<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item.id"
      :to="`/shop/${item.id}`"
      class="nearby__item"
    >
      <ShopInfo :item="item" :hide-border="false" />
    </router-link>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    get('/api/shop/hot-list').catch((err) => {
      setTimeout(() => {
        nearbyList.value = [
          {
            id: 1,
            imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
            name: '沃尔玛',
            tags: ['月售1万+', '起送¥0', '基础运费¥5'],
            sales: '1万+',
            expressLimit: '22',
            expressPrice: '50',
            slogan: 'VIP尊享满89元减4元运费券（每月3张）',
          },
          {
            id: 2,
            imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
            name: '沃尔玛',
            sales: '1万+',
            expressLimit: '22',
            expressPrice: '50',
            tags: ['月售1万+', '起送¥5', '基础运费¥5'],
            slogan: 'VIP尊享满89元减4元运费券（每月3张）',
          },
        ]
      }, 100)
    })
  }
  return { nearbyList, getNearbyList }
}

// console.log('useNearbyListEffect()', useNearbyListEffect().getNearbyList())

const { nearbyList, getNearbyList } = useNearbyListEffect()
getNearbyList()

watchEffect(() => {
  console.log('nearbyList', nearbyList.value)
})
</script>

<style lang="scss" scoped>
@use '../../style/viriables.scss' as vars; // 需要命名空间

.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: vars.$content-fontcolor;
  }
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    border-bottom: 1px solid vars.$content-bgColor;
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: vars.$content-fontcolor;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: vars.$content-fontcolor;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
a {
  text-decoration: none;
}
</style>
