export interface Notification {
  id: number
  userId: number
  username: string
  senderId: number
  senderUsername: string
  propertyId: number
  propertyTitle: string
  commentId: number
  createdAt: string
  seen: boolean
}
