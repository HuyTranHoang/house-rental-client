import { getAllAdvertisements } from "@/api/advertisement.api"
import { useQuery } from "@tanstack/react-query"

export const useAdvertisements = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['advertisements'],
        queryFn: getAllAdvertisements
    })
    return {advData: data, advIsLoading: isLoading}
}