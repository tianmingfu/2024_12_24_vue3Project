<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe600;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont"></span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content />
    <Cart />
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}
// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    console.log('route.params.id')
    data.item = {
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      name: '沃尔玛',
      tags: ['月售1万+', '起送¥0', '基础运费¥5'],
      sales: '1万+',
      expressLimit: '22',
      expressPrice: '50',
      slogan: 'VIP尊享满89元减4元运费券（每月3张）',
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
const { item, getItemData } = useShopInfoEffect()
getItemData()

const handleBackClick = useBackRouterEffect()
</script>

<style lang="scss" scoped>
@use '../../style/viriables.scss' as viriables;
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: viriables.$search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: viriables.$search-fontColor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: viriables.$content-fontcolor;
      &::placeholder {
        color: viriables.$content-fontcolor;
      }
    }
  }
}
</style>
