export interface Comment {
  id: number
  comment: string
  propertyId: number
  propertyTitle: string
  userId: number
  userName: string
  userAvatar: string | undefined
  createdAt: string
}

export interface CommentFieldType {
  propertyId: number
  rating: number
  comment: string
}
