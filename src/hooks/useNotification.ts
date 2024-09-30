import { fetchNotificationByUserId } from '@/api/notification.api.ts'
import { useQuery } from '@tanstack/react-query'

export const useNotificationByUserId = (userId: number | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotificationByUserId(userId!),
    enabled: userId !== undefined
  })

  return { notificationData: data, notificationIsloading: isLoading, notificationIsError: isError }
}
