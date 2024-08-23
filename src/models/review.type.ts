export interface Review {
  id: number
  rating: number
  comment: string
  propertyId: number
  propertyTitle: string
  userId: number
  userName: string
  userAvatar: string | undefined
  createdAt: string
}

export interface ReviewFieldType {
  propertyId: number
  rating: number
  comment: string
}
