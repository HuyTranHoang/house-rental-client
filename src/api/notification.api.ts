import axiosInstance from '@/inteceptor/axiosInstance.ts'
import { Notification } from '@/types/notification.type.ts'
import { toast } from 'sonner'

export const fetchNotificationByUserId = async (userId: number) => {
  try {
    const response = await axiosInstance.get<Notification[]>(`/api/notification/${userId}`)
    return response.data
  } catch (error) {
    console.error(error)
    toast.error('Lỗi khi lấy thông báo')
    return []
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