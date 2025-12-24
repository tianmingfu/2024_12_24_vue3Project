import { useStore } from 'vuex'
import { computed } from 'vue'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num,
    })
    store.commit('changeCartShopName', {
      shopId,
      name: '山姆会员店',
    })
  }

  const calculations = computed(() => {
    const productList = cartList[shopId]
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += product.count * product.price
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  const productList = computed(() => {
    const productList = cartList[shopId] || {}
    const notEmptyProductList = {}
    for (let i in productList) {
      const product = productList[i]
      if (product.check) {
        if (product.count > 0) {
          notEmptyProductList[i] = product
        }
      }
    }
    return notEmptyProductList
  })

  const shopName = computed((shopId) => {
    const shopName = store.state.cartList['name']
    return shopName
  })

  return { cartList, changeCartItemInfo, productList, shopName, calculations }
}
