<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__info">
        <div class="header__info__user">{{ userInfo.username }}</div>
        <div class="header__info__id">ID:{{ userInfo._id }}</div>
      </div>
      <img
        class="header__avatar"
        src="data:image/jpeg;base64,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"
      />
    </div>
    <div class="list">
      <div class="list__item" @click="handleAddressClick">
        <div class="list__item__icon iconfont">&#xe6b8;</div>
        <div class="list__item__test">我的地址</div>
        <div class="list__item__arrow iconfont">&#xe62d;</div>
      </div>
    </div>
    <div class="logout" @click="handleLogout">退出登陆</div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Docker from '../../components/Docker.vue'

const useUserEffect = () => {
  const userInfo = reactive({ _id: '', username: '' })
  const getUserInfo = async () => {
    const { _id, username } = {
      _id: '3411919101',
      username: '田磊',
    }
    userInfo._id = _id || ''
    userInfo.username = username || ''
  }
  getUserInfo()
  return userInfo
}
const router = useRouter()
const handleLogout = () => {
  localStorage.removeItem('isLogin')
  // router.replace({ name: 'Login' })
}
const handleAddressClick = () => {
  router.push({ name: 'MyAddressList' })
}
const userInfo = useUserEffect()
</script>

<style lang="scss" scoped>
@use '../../style/viriables.scss' as viriables;
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: viriables.$dark-bgColor;
}
.header {
  position: relative;
  height: 1.5rem;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  padding-top: 0.4rem;
  &__info {
    margin: 0.3rem 0.18rem 0 0.18rem;
    padding-top: 0.46rem;
    height: 0.66rem;
    background: #fff;
    border-radius: 0.08rem;
    &__user {
      font-size: 0.24rem;
      color: #262628;
      text-align: center;
      line-height: 0.36rem;
    }
    &__id {
      margin-top: 0.04rem;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
  }
  &__avatar {
    position: absolute;
    left: 50%;
    top: 0.2rem;
    transform: translateX(-50%);
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
  }
}
.list {
  margin: 0.16rem 0.18rem 0 0.18rem;
  background: viriables.$bgColor;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  &__item {
    display: flex;
    padding: 0.2rem;
    line-height: 0.32rem;
    font-size: 0.14rem;
    color: #262626;
    &__icon {
      margin-right: 0.12rem;
      width: 0.22rem;
      height: 0.22rem;
      border-radius: 0.08rem;
      text-align: center;
      color: viriables.$bgColor;
    }
    &__test {
      flex: 1;
    }
    &__arrow {
      width: 0.2rem;
      font-weight: bold;
      color: #c2c4ca;
    }
  }
}
.iconfont {
  font-size: 0.22rem;
}
.logout {
  margin: 0.18rem;
  line-height: 0.32rem;
  background: viriables.$btn-bgColor;
  color: viriables.$bgColor;
  text-align: center;
  border-radius: 0.04rem;
}
</style>

<!-- <div class="list">
      <div class="list__item" @click="handleAddressClick">
        <div class="list__item__icon iconfont">&#xe6b8;</div>
        <div class="list__item__test">我的地址</div>
        <div class="list__item__arrow iconfont">&#xe62d;</div>
      </div>
    </div> -->
