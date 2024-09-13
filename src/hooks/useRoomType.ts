import { fetchAllRoomTypes } from '@/api/roomType.api.ts'
import { useQuery } from '@tanstack/react-query'

export const useRoomTypes = () => {
  const { data: roomTypeData, isLoading: roomTypeIsLoading } = useQuery({
    queryKey: ['roomTypes'],
    queryFn: fetchAllRoomTypes
  })

  return { roomTypeData, roomTypeIsLoading }
}
