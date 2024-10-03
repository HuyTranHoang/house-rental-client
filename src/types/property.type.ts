import React from 'react'

export interface Property {
  id: number
  title: string
  description: string
  location: string
  price: number
  area: number
  numRooms: number
  status: string
  userId: number
  userName: string
  cityId: number
  cityName: string
  districtId: number
  districtName: string
  roomTypeId: number
  roomTypeName: string
  amenities: string[]
  propertyImages: string[]
  thumbnailUrl: string
  thumbnailOriginalName: string
  priorityExpiration: string
  refreshedAt: string
  createdAt: string
  hidden: boolean
  priority: boolean
  blocked: boolean
}

export type PropertyDataSource = Property & {
  key: React.Key
  index?: number
}

export enum PropertyStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export type PropertyFilters = {
  search?: string
  cityId?: number
  districtId?: number
  roomTypeId?: number
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  numOfDays?: number
  sortBy?: string
  pageNumber?: number
  pageSize?: number
}
