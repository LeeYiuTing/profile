import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 引入Vant
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router/index'

const app = createApp(App)
app.use(Vant)
app.use(router)
app.mount('#app')