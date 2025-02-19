export interface Place {
  id: string
  name: string
  latitude: number
  longitude: number
  preview: string
  coverImageId: string
  article: string
}

export type NewPlace = Omit<Place, 'id'>
