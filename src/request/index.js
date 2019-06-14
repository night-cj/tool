import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'

let baseURL = ''
// baseURL = process.env.VUE_APP_BASE_API
// if (process.env.NODE_ENV === 'development') baseURL = 'http://localhost:8089'
// if (process.env.NODE_ENV === 'development') baseURL = 'http://172.16.10.182:10000'
if (process.env.NODE_ENV === 'development') baseURL = 'http://47.110.58.220:10000'
else baseURL = 'http://47.110.58.220:10001'
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})
// request拦截器
let loading = null
service.interceptors.request.use(
  config => {
    loading = Loading.service()
    if (store.state.token) {
      config.headers = {
        Authorization: store.state.token
      }
    }
    return config
  },
  error => {
    loading.close()
    Message.error(error.message)
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    loading.close()
    let method = response.config.method
    if (response.data.status === 0 && method !== 'get') Message.success('操作成功!')
    if (response.data.status !== 0) Message.error(`err : ${response.data.msg}`)
    return response.data
  },
  error => {
    loading.close()
    console.log('err: ' + error)
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
