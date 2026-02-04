import type { AxiosInstance, AxiosResponse } from 'axios'

import type { RequestClientConfig, RequestClientOptions } from './types'

import { isString, merge } from '@/utils'

import axios from 'axios'
import qs from 'qs'

import { FileDownloader } from './modules/downloader'
import { InterceptorManager } from './modules/interceptor'
import { SSE } from './modules/sse'
import { FileUploader } from './modules/uploader'

const paramsSerializerMap = {
  brackets: (params: any) => qs.stringify(params, { arrayFormat: 'brackets' }),
  comma: (params: any) => qs.stringify(params, { arrayFormat: 'comma' }),
  indices: (params: any) => qs.stringify(params, { arrayFormat: 'indices' }),
  repeat: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' }),
} as const

function getParamsSerializer(
  paramsSerializer: RequestClientOptions['paramsSerializer'],
) {
  if (isString(paramsSerializer)) {
    return paramsSerializerMap[paramsSerializer]
  }
  return paramsSerializer
}

type RequestClient = {
  addRequestInterceptor: InterceptorManager['addRequestInterceptor']
  addResponseInterceptor: InterceptorManager['addResponseInterceptor']
  download: FileDownloader['download']
  instance: AxiosInstance
  isRefreshing: boolean
  postSSE: SSE['postSSE']
  refreshTokenQueue: ((token: string) => void)[]
  requestSSE: SSE['requestSSE']
  upload: FileUploader['upload']
  delete: <T = any>(url: string, config?: RequestClientConfig) => Promise<T>
  get: <T = any>(url: string, config?: RequestClientConfig) => Promise<T>
  getBaseUrl: () => string | undefined
  post: <T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ) => Promise<T>
  put: <T = any>(
    url: string,
    data?: any,
    config?: RequestClientConfig,
  ) => Promise<T>
  request: <T = any>(url: string, config: RequestClientConfig) => Promise<T>
}

function createRequestClient(options: RequestClientOptions = {}): RequestClient {
  const defaultConfig: RequestClientOptions = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    responseReturn: 'raw',
    timeout: 10_000,
  }
  const { ...axiosConfig } = options
  const requestConfig = merge(axiosConfig, defaultConfig)
  requestConfig.paramsSerializer = getParamsSerializer(
    requestConfig.paramsSerializer,
  )
  const instance = axios.create(requestConfig)

  const interceptorManager = new InterceptorManager(instance)
  const addRequestInterceptor =
    interceptorManager.addRequestInterceptor.bind(interceptorManager)
  const addResponseInterceptor =
    interceptorManager.addResponseInterceptor.bind(interceptorManager)

  const request = async <T = any>(
    url: string,
    config: RequestClientConfig,
  ): Promise<T> => {
    try {
      const paramsSerializer = config.paramsSerializer
        ? getParamsSerializer(config.paramsSerializer)
        : undefined
      const response: AxiosResponse<T> = await instance({
        url,
        ...config,
        ...(paramsSerializer ? { paramsSerializer } : {}),
      })

      return response as T
    } catch (error: any) {
      throw error.response ? error.response.data : error
    }
  }

  const client: RequestClient = {
    instance,
    isRefreshing: false,
    refreshTokenQueue: [],
    addRequestInterceptor,
    addResponseInterceptor,
    getBaseUrl: () => instance.defaults.baseURL,
    delete: (url, config) => request(url, { ...config, method: 'DELETE' }),
    get: (url, config) => request(url, { ...config, method: 'GET' }),
    post: (url, data, config) =>
      request(url, { ...config, data, method: 'POST' }),
    put: (url, data, config) =>
      request(url, { ...config, data, method: 'PUT' }),
    request,
    upload: undefined as unknown as FileUploader['upload'],
    download: undefined as unknown as FileDownloader['download'],
    postSSE: undefined as unknown as SSE['postSSE'],
    requestSSE: undefined as unknown as SSE['requestSSE'],
  }

  const fileUploader = new FileUploader(client)
  client.upload = fileUploader.upload.bind(fileUploader)

  const fileDownloader = new FileDownloader(client)
  client.download = fileDownloader.download.bind(fileDownloader)

  const sse = new SSE(client)
  client.postSSE = sse.postSSE.bind(sse)
  client.requestSSE = sse.requestSSE.bind(sse)

  return client
}

export { createRequestClient }
export type { RequestClient }
