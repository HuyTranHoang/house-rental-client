import { fetchAllAmenities } from '@/api/amenity.api.ts'
import { useQuery } from '@tanstack/react-query'

export const useAmenities = () => {
  const { data: amenityData, isLoading: amenityIsLoading } = useQuery({
    queryKey: ['amenities'],
    queryFn: fetchAllAmenities
  })

  return { amenityData, amenityIsLoading }
}
