import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchByUserId, updateUserMembership } from "@/api/userMembership";

interface UpdateMembershipParams {
    userId: number;
    membershipId: number;
  }
  

export const useUserMembership = (userId: number) => {
  return useQuery({
    queryKey: ['userMembership', userId],
    queryFn: () => fetchByUserId(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserMembership = () => {
    return useMutation({
        mutationFn: ({ userId, membershipId }: UpdateMembershipParams) =>
      updateUserMembership(userId, membershipId)
    });
};