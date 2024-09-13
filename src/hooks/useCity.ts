import { fetchAllCities } from '@/api/city.api.ts'
import { useQuery } from '@tanstack/react-query'

export const useCities = () => {
  const { data: cityData, isLoading: cityIsLoading } = useQuery({ queryKey: ['cities'], queryFn: fetchAllCities })

  return { cityData, cityIsLoading }
}
