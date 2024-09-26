import { fetchByUserId, updateUserMembership } from '@/api/userMembership'
import { useMutation, useQuery } from '@tanstack/react-query'

interface UpdateMembershipParams {
  userId: number
  membershipId: number
}

export const useUserMembership = (userId: number | undefined) => {
  return useQuery({
    queryKey: ['userMembership', userId],
    queryFn: () => fetchByUserId(userId!),
    enabled: !!userId
  })
}

export const useUpdateUserMembership = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ userId, membershipId }: UpdateMembershipParams) => updateUserMembership(userId, membershipId)
  })

  return { mutate: mutateAsync, isPending }
}
