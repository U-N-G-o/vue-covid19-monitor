import axios from "axios";

const baseUrl = '/list'

const fetch = (method = 'GET', url, param = '') => {
  const fetchUrl = baseUrl + url
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: fetchUrl,
      changeOrigin: true,
      data: JSON.stringify(param)
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch;