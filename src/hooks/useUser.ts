import { getUserById } from '@/api/user.api'
import { useQuery } from '@tanstack/react-query'

export const useUser = (userId: number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId
  })

  return { userData: data, userIsLoading: isLoading }
}
