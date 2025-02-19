import axios from 'axios'

import type { UploadedFile } from '@/types/File.d'
import type { Place } from '@/types/Place'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  const form = new FormData()
  form.append('file', file)

  const response = await client.post<UploadedFile>('/file', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const createPlace = async (place: Omit<Place, 'id'>): Promise<Place> => {
  const response = await client.post<Place>('/place', place, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const getPlace = async (id: string): Promise<Place> => {
  const response = await client.get<Place>(`/place/${id}`)
  return response.data
}

export const getPlaces = async (): Promise<Array<Place>> => {
  const response = await client.get<Array<Place>>('/place')
  return response.data
}
