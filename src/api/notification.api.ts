import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Notification } from '@/types/notification.type.ts'
import { PageInfo } from '@/types/pageInfo.type.ts'
import { toast } from 'sonner'

export interface NotificationPagination {
  data: Notification[]
  pageInfo: PageInfo
}

export const fetchNotificationByUserId = async (
  userId: number,
  pageNumber: number,
  pageSize: number
): Promise<NotificationPagination> => {
  try {
    const params = { userId, pageNumber, pageSize }
    const response = await axiosInstance.get<NotificationPagination>('/api/notification', { params })
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi lấy thông báo')
    throw error
  }
}

export const updateNotificationSeen = async (notificationId: number) => {
  try {
    await axiosInstance.put(`/api/notification/${notificationId}`)
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi cập nhật thông báo')
  }
}

export const markAllNotificationAsRead = async (userId: number) => {
  try {
    await axiosInstance.put(`/api/notification/mark-all-as-read/${userId}`)
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi đánh dấu tất cả thông báo đã đọc')
  }
}
