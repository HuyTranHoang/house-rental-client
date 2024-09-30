import { fetchNotificationByUserId, updateNotificationSeen } from '@/api/notification.api.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useNotificationByUserId = (userId: number | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotificationByUserId(userId!),
    enabled: userId !== undefined
  })

  return { notificationData: data, notificationIsloading: isLoading, notificationIsError: isError }
}

export const useUpdateNotificationSeen = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateNotificationSeen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })

  return { updateNotificationSeen: mutate }
}
