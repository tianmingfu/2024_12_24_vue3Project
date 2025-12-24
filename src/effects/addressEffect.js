import { useStore } from 'vuex'
import { get } from '../utils/request'

const useCommonAddressEffect = () => {
  const store = useStore()

  const setAddressList = (addressItem, addressId) => {
    const addressList = store.state.addressList
    if (addressId) {
      // 更新地址
      addressList[addressId] = addressItem
    } else {
      addressList.push(addressItem)
    }
    store.commit('changeAddressList', addressList)
  }

  const getAddressList = async (forceUpdate) => {
    const addressList = store.state.addressList
    setTimeout(() => {
      store.commit('changeAddressList', [
        {
          name: '张三',
          _id: '0',
          phone: '13800138000',
          city: '北京',
          department: '幸福小区1',
          houseNumber: '8号楼1单元100',
        },
        {
          name: '李四',
          _id: '1',
          phone: '13800138001',
          city: '上海',
          department: '幸福小区2',
          houseNumber: '8号楼1单元101',
        },
        {
          name: '王五',
          _id: '2',
          phone: '13800138002',
          city: '广州',
          department: '幸福小区3',
          houseNumber: '8号楼1单元102',
        },
        {
          name: '赵六',
          _id: '3',
          phone: '13800138003',
          city: '深圳',
          department: '幸福小区4',
          houseNumber: '8号楼1单元103',
        },
        {
          name: '钱七',
          _id: '4',
          phone: '13800138004',
          city: '杭州',
          department: '幸福小区5',
          houseNumber: '8号楼1单元104',
        },
      ])
    }, 1000)
  }

  return { getAddressList, setAddressList }
}

export default useCommonAddressEffect
