import { createApp } from 'vue'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(ElementPlus)
// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;
app.mount('#app')
