import './assets/main.css'
import './style/iconfont.css'
import 'normalize.css'
import './style/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from './store/stroe.js'
const app = createApp(App)

app.use(router)
app.use(store)

// 路由错误处理
router.onError((error, to, from) => {
  console.error('路由错误:', error)
  console.log('从:', from.path, '到:', to.path)
})

app.mount('#app')
