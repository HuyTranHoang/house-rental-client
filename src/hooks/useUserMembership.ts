import { useQuery } from "@tanstack/react-query";
import { fetchByUserId } from "@/api/userMembership";

export const useUserMembership = (userId: number) => {
  return useQuery({
    queryKey: ['userMembership', userId],
    queryFn: () => fetchByUserId(userId),
    enabled: !!userId,
  });
};
