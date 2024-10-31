import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

// 扩展 AxiosRequestConfig 接口以包含 showLoading 属性
declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean;
  }
}

// 定义 LoadingInstance 接口
interface LoadingInstance {
    close(): void;
}


let loadingInstance: LoadingInstance | null = null;

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/',
  // 超时
  timeout: 200000,
  // 是否loading
  showLoading: true
})

// request拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 加载loading
  if (config.showLoading) {
    loadingInstance = ElLoading.service({
      fullscreen: true, // 同 `v-ElLoading` 指令中的 `fullscreen` 修饰符
      text: '正在加载', // 显示在加载图标下方的加载文案
      spinner: 'el-icon-ElLoading', // 自定义加载图标类名
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  return config
}, (error: AxiosError) => {
  Promise.reject(error)
})

// 响应拦截器

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 关闭loading
    if (response.config.showLoading && loadingInstance) {
      loadingInstance.close();
    }

    if (response.data.code === 0 && response.data.msg === 'NOTLOGIN'){
      localStorage.clear()
      window.location.href = '/login'
    }
    return response;
  },
  (error: AxiosError) => {
    // 如果请求失败，也关闭loading
    if (error.config && error.config.showLoading && loadingInstance) {
      loadingInstance.close();
    }
    // 提示请求失败({错误信息，错误类型，	显示时间，单位为毫秒。 设为 0 则不会自动关闭})
    ElMessage({ message: '请求失败', type: 'error', duration: 5000 })
    return Promise.reject(error);
  }
)

export default service