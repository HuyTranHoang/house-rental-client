import {
  fetchNotificationByUserId,
  markAllNotificationAsRead,
  NotificationPagination,
  updateNotificationSeen
} from '@/api/notification.api.ts'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useNotificationByUserId = (userId: number | undefined, pageSize: number) => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<
    NotificationPagination,
    Error
  >({
    queryKey: ['notifications', userId, pageSize],
    queryFn: async ({ pageParam = 0 }) => fetchNotificationByUserId(userId!, pageParam as number, pageSize),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.number + 1
      }
      return undefined
    },
    enabled: userId !== undefined
  })

  return {
    notificationData: data?.pages.flatMap((page) => page.data) ?? [],
    notificationIsLoading: isLoading,
    notificationIsError: isError,
    notificationError: error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchNotifications: refetch
  }
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

export const useMarkAllNotificationAsRead = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: markAllNotificationAsRead,
    onSuccess: () => {
      queryClient.setQueryData(['notifications'], (oldData: NotificationPagination | undefined) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          data: oldData.data.map((notification) => ({ ...notification, seen: true }))
        }
      })

      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }
  })

  return { markAllNotificationAsRead: mutate }
}
