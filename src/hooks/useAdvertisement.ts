import { getAllAdvertisements } from "@/api/advertisement.api"
import { useQuery } from "@tanstack/react-query"

export const useAdvertisements = () => {
    const { data } = useQuery({
        queryKey: ['advertisements'],
        queryFn: getAllAdvertisements
    })
    return {advData: data}
}