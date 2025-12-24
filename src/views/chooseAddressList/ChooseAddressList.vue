<template>
  <div class="wrapper">
    <div class="title">
      <div class="iconfont title__icon" @click="handleBackClick">&#xe600;</div>
      收货地址
    </div>
    <Address
      v-for="address in addressList"
      :key="address._id"
      :address="address"
      @click="() => handleAddressClick(address._id)"
    />
  </div>
</template>

<script setup>
import Address from '../../components/Address.vue'
import useCommonAddressEffect from '../../effects/addressEffect'

import { toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()
const shopId = route.params.shopId
const { addressList } = toRefs(store.state)
const { getAddressList } = useCommonAddressEffect()
getAddressList()
const handleBackClick = () => {
  router.back()
}
const handleAddressClick = (id) => {
  router.push(`/orderConfirmation/${shopId}/${id}`)
}
</script>

<style lang="scss" scoped>
@use '../../style/viriables.scss' as viriables;
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: viriables.$dark-bgColor;
}
.title {
  position: relative;
  line-height: 0.44rem;
  background: viriables.$bgColor;
  font-size: 0.16rem;
  color: viriables.$content-fontcolor;
  text-align: center;
  &__icon {
    position: absolute;
    left: 0.18rem;
    top: 0;
    font-size: 0.2rem;
  }
}
</style>
