import { onUnmounted } from "vue";;
import { toRefs, reactive, onMounted } from "vue";
import fetch from "../utils/fetch";
import { formatProvinceName } from '../utils/formatter'

const globalState = reactive({
  chinaMapData: null,
  chinaDayList: null,
  chinaTotal: null,
  isLoading: true
})

export function useData() {

  onMounted(async() => {
    /** 通过网易提供接口：https://c.m.163.com/ug/api/wuhan/app/data/list-total 获取疫情数据 */
    await fetch('GET', '/ug/api/wuhan/app/data/list-total').then(res => {
      const { areaTree, chinaDayList, chinaTotal } = res.data.data
      /** 筛选出中国的数据 */
      globalState.chinaMapData = areaTree.find(item => item.name === '中国')
      globalState.chinaDayList = chinaDayList
      globalState.chinaTotal = chinaTotal
      globalState.isLoading = false
    })
  })

  onUnmounted(() => {
    isLoading.value = true
  })

  return {
    ...toRefs(globalState)
  }
}