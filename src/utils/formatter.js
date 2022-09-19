/** 每3位数字加逗号 */
const formatNumber = (value) => {
  return value.toString().replace(/\d+/, (v) => {
    return v.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}

/** 格式化接口中的省份名 name 数据 */
const formatProvinceName = (name) => {
  switch(name) {
    case '上海':
    case '北京':
    case '天津':
    case '重庆':
      return name + '市';
    case '西藏':
    case '内蒙古':
      return name + '自治区';
    case '新疆':
      return name + '维吾尔自治区';
    case '广西':
      return name + '壮族自治区';
    case '宁夏':
      return name + '回族自治区';
    case '香港':
    case '澳门':
      return name + '特别行政区'
    default:
      return name + '省'
  }
}

export { formatNumber, formatProvinceName }