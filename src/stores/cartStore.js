//封装购物车模块
import {defineStore} from 'pinia'
import {computed,ref} from 'vue'
import {useUserStore} from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cartStore', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])
  //获取最新购物车列表
  const updateNewList = async () =>{
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const {skuId,count} = goods
    if(isLogin.value){
      await insertCartAPI({skuId,count})
      updateNewList()
      // const res = await findNewCartListAPI()
      // cartList.value = res.result
    }else{
      //添加购物车操作
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
    
  }

  //删除购物车里的商品
  const delCart = async(skuId) => {
    if(isLogin.value){
      await delCartAPI([skuId])
      updateNewList()
      // const res = await findNewCartListAPI()
      // cartList.value = res.result
    }else{
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
    }
    
  }

  //清除购物车
  const  clearCart = () => {
    cartList.value = []
  }

  //单选功能
  const singleCheck = (skuId,selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  //全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  //计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  
  // 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  // 已选择商品价格合计

  //是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  return{
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    updateNewList
    
  }
},{
  persist:true
})