import { fetchAllMemberships } from "@/api/membership";
import { useQuery } from "@tanstack/react-query";

export const useMemberships = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['memberships'],
    queryFn: fetchAllMemberships
  });
  
  return { membershipData: data, membershipIsLoading: isLoading, membershipIsError: isError };
};
