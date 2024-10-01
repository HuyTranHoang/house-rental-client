export interface Notification {
  id: number
  userId: number
  username: string
  senderId: number
  senderUsername: string
  propertyId: number
  propertyTitle: string
  commentId: number
  type: NotificationType
  createdAt: string
  seen: boolean
}

export enum NotificationType {
  COMMENT = 'COMMENT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
