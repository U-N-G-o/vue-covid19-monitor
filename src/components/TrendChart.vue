<script setup>
  import { ref, getCurrentInstance, onMounted } from 'vue'
  
  const props = defineProps({
    chinaDayList: Object,
  })
  
  const trendChart = ref()
  const {proxy: { $echarts }} = getCurrentInstance()
  
  onMounted(() => {
    drawChart()
  });

  /** 最近一周的数据 */
  const recentWeekData = props.chinaDayList.splice(-7)

  const rawData = recentWeekData.reduce((pre, cur) => {
    const { date, today: { confirm, input } } = cur
    const formattedDate = date.slice(5)
    return [
      ...pre,
      [confirm, '确诊', formattedDate],
      [input, '境外输入', formattedDate]
    ]
  }, [['value', 'type', 'date']])
  
  function drawChart() {
    const myChart = $echarts.init(trendChart.value)
    const option = {
      dataset: [
        {
          id: 'dataset_raw',
          source: rawData
        },
        {
          id: 'recent confirm',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'type', '=': '确诊' }
              ]
            }
          }
        },
        {
          id: 'recent input',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'type', '=': '境外输入' }
              ]
            }
          }
        }
      ],
      title: {
        text: '近一周确诊病例'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle'
      },
      yAxis: {
        name: '确诊'
      },
      series: [
        {
          type: 'line',
          datasetId: 'recent confirm',
          showSymbol: false,
          name: '确诊',
          encode: {
            x: 'date',
            y: 'value',
            itemName: 'date',
            tooltip: ['value']
          }
        },
        {
          type: 'line',
          datasetId: 'recent input',
          showSymbol: false,
          name: '境外输入',
          encode: {
            x: 'date',
            y: 'value',
            itemName: 'date',
            tooltip: ['value']
          }
        }
      ]
    };
    myChart.setOption(option)
  }
  </script>
  
  <template>
    <div class="border-2 p-[10px] rounded-md h-1/2 shadow">
      <div ref="trendChart" class="h-full"></div>
    </div>
  </template>
  