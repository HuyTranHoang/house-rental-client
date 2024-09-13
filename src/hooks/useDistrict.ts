import { fetchAllDistricts } from '@/api/district.api.ts'
import { useQuery } from '@tanstack/react-query'

export const useDistricts = () => {
  const { data: districtData, isLoading: districtIsLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: fetchAllDistricts
  })

  return { districtData, districtIsLoading }
}
