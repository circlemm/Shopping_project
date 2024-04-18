import httpInstance from '@/utils/http'

//获取banner
export function getBannerAPI(params = {}) {
  const {distributionSite = '1'} = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
  })
}
//新鲜好物
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}

// 人气推荐
// export const getHotAPI = () => {
//   return  httpInstance('home/hot', 'get', {})
// }

export const getHotAPI = () => {
  return  httpInstance({
    url:'/home/hot'
  })
}

//所有商品模块
export const getGoodsAPI = () => {
  return  httpInstance({
    url:'/home/goods'
  })
}
