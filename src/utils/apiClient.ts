import axios from 'axios'

export interface RequestParams {
  url: string
  payload?: object
}

export class APIClient {
  client = axios.create({
    baseURL: 'http://localhost:8000',
  })

  async get<T>(params: RequestParams): Promise<T> {
    const { url } = params

    const response = await this.client.get<T>(url)
    return response.data
  }

  async post<T>(params: RequestParams): Promise<T> {
    const { url, payload } = params

    const response = await this.client.post<T>(url, payload)
    return response.data
  }
}

export const apiClient = new APIClient()
