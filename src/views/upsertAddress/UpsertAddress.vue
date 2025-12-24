<template>
  <div class="wrapper">
    <div class="title">
      <div class="iconfont title__back" @click="handleBackClick">&#xe600;</div>
      <div class="title__text">
        {{ addressId ? '编辑收货地址' : '新建收货地址' }}
      </div>
      <div class="title__save" @click="upsertAddress">保存</div>
    </div>
    <div class="form">
      <div class="form__item">
        <div class="form__item__label">所在城市:</div>
        <input class="form__item__content" placeholder="如北京市" v-model="formData.city" />
      </div>
      <div class="form__item">
        <div class="form__item__label">小区/大厦/学校:</div>
        <input
          class="form__item__content"
          placeholder="如理工大学国防科技园"
          v-model="formData.department"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">楼号-门牌号:</div>
        <input class="form__item__content" placeholder="A号楼B层" v-model="formData.houseNumber" />
      </div>
      <div class="form__item">
        <div class="form__item__label">收货人:</div>
        <input
          class="form__item__content"
          placeholder="请填写收货人的姓名"
          v-model="formData.name"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">联系电话:</div>
        <input
          class="form__item__content"
          placeholder="请填写收货手机号"
          v-model="formData.phone"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
// import { post, get, patch } from '../../utils/request'
import useCommonAddressEffect from '../../effects/addressEffect'

const useAddressEffect = () => {
  const store = useStore()
  const { addressList } = toRefs(store.state)
  const { getAddressList, setAddressList } = useCommonAddressEffect()
  getAddressList()
  return { addressList, setAddressList }
}

const useFormEffect = (addressId) => {
  const router = useRouter()
  const formData = reactive({
    city: '',
    department: '',
    houseNumber: '',
    name: '',
    phone: '',
  })
  const getAddressItem = async () => {
    const addressItem = addressList.value[addressId]
    const { city, department, houseNumber, name, phone } = addressItem
    formData.city = city
    formData.department = department
    formData.houseNumber = houseNumber
    formData.name = name
    formData.phone = phone
  }
  const upsertAddress = async () => {
    setAddressList(formData, addressId)
    // router.back()
  }
  if (addressId) {
    getAddressItem()
  }
  return { formData, upsertAddress }
}

const router = useRouter()
const route = useRoute()
const addressId = route?.params?.id
const { addressList, setAddressList } = useAddressEffect()
const { formData, upsertAddress } = useFormEffect(addressId)
const handleBackClick = () => {
  router.back()
}
// return { addressId, addressList, formData, handleBackClick, upsertAddress }
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
  display: flex;
  line-height: 0.44rem;
  background: viriables.$bgColor;
  font-size: 0.16rem;
  color: viriables.$content-fontcolor;
  text-align: center;
  &__back {
    width: 0.2rem;
    margin-left: 0.18rem;
    font-size: 0.2rem;
    color: viriables.$search-fontColor;
  }
  &__text {
    flex: 1;
    text-align: center;
  }
  &__save {
    margin-right: 0.2rem;
    font-size: 0.14rem;
  }
}
.form {
  padding: 0 0.2rem;
  margin-top: 0.12rem;
  background: viriables.$bgColor;
  border-top: 0.01rem solid viriables.$content-bgColor;
  border-bottom: 0.01rem solid viriables.$content-bgColor;
  &__item {
    display: flex;
    padding: 0.12rem 0;
    line-height: 0.2rem;
    font-size: 0.14rem;
    border-bottom: 0.01rem solid viriables.$content-bgColor;
    &:last-of-type {
      border-bottom: none;
    }
    &__label {
      margin-right: 0.05rem;
      color: viriables.$medium-fontColor;
    }
    &__content {
      flex: 1;
      border: none;
      outline: none;
      color: #3f3f3f;
      &::placeholder {
        color: #3f3f3f;
      }
    }
  }
}
</style>
