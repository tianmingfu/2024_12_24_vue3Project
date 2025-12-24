<template>
  <div class="content">
    <div class="category">
      <div
        :class="{ category__item: true, 'category__item--active': currentTab === item.tab }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售 {{ item.sales }} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1)
              }
            "
            >-</span
          >
          {{ cartList?.[shopId]?.[item._id]?.count || 0 }}
          <span
            class="product__number__plus"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1)
              }
            "
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from './commonCartEffect.js'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '秒杀', tab: 'seckill' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '全部商品', tab: 'all' },
]

// Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    console.log('getContentData', shopId)
    console.log('currentTab.value', currentTab.value)
    content.list = [
      {
        _id: 1,
        name: '新鲜水果',
        imgUrl:
          'data:image/jpeg;base64,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',
        price: 5.9,
        oldPrice: 6.9,
        sales: 999,
      },
      {
        _id: 2,
        name: '新鲜蔬菜',
        imgUrl:
          'data:image/jpeg;base64,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',
        price: 3.9,
        oldPrice: 4.9,
        sales: 888,
      },
    ]
  }
  watchEffect(() => {
    console.log('watchEffectwatchEffectwatchEffect')
    getContentData()
  })
  const { list } = toRefs(content)
  return { list }
}

const route = useRoute()
const shopId = route.params.id
const { currentTab, handleTabClick } = useTabEffect()
const { list } = useCurrentListEffect(currentTab, shopId)
const { changeCartItemInfo, cartList } = useCommonCartEffect()
</script>

<style lang="scss" scoped>
@use '../../style/viriables.scss' as viriables;
@use '../../style/mixins.scss' as mixins;
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 0.76rem;
  background: viriables.$search-bgColor;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: #333;
    &--active {
      background: viriables.$bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid viriables.$content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: viriables.$content-fontcolor;
      @include mixins.ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: viriables.$content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: viriables.$hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: viriables.$light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid viriables.$medium-fontColor;
        color: viriables.$medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        background: viriables.$btn-bgColor;
        color: viriables.$bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
