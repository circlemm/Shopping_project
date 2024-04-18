import request from '@/utils/http'

//获取一级分类数据
export function getCategoryAPI(id) {
  return request({
    url:'/category',
    params:{
      id
    }
  })
}


// 获取二级分类数据
export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

//获取导航数据
export const getSubCategoryAPI = (data) => {
  return request({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}