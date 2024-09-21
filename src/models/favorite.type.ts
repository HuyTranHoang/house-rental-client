import { Property } from '@/models/property.type.ts'

export interface Favorite {
  userId: number
  username: string
  propertyId: number
  propertyTitle: string
  createdAt: string
}


export interface FavoriteProperty {
  userId: number
  properties: Property[]
}