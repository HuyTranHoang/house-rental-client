import { fetchPropertyById } from '@/api/property.api'
import { useQuery } from '@tanstack/react-query'

export const useProperty = (propertyId: number) => {
  const { data: propertyData, isLoading: propertyIsLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => fetchPropertyById(propertyId),
    enabled: propertyId !== undefined
  })
  return { propertyData, propertyIsLoading }
}
