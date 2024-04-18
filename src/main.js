import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import'@/styles/common.scss'

// //接口测试函数
//  import {getCategory} from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res);
// })

//引入全局组件插件
import { componentPlugin } from '@/components'

//引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// app.use(createPinia())
app.use(router)
app.use(componentPlugin)
app.use(lazyPlugin)

app.mount('#app')


