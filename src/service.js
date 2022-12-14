// axios 进行二次封装
import axios from 'axios'
import { getToken } from '@/utils/setToken.js'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL:'/api', // 会自动加在请求地址上
    timeout:3000, // 指定请求的超时毫秒数
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 请求之前做些什么(获取并设置token)
    config.headers['token'] = getToken('toKen')
    return config
},(error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做些什么
    let {status, message} = response.data
    if(status !== 200){
        Message({message: message || 'error' , type:'warning'})
    }
    return response
},(error) => {
    return Promise.reject(error)
})

export default service