import axiosInstance from "@/inteceptor/axiosInstance"
import { Advertisement } from "@/types/advertisement.type"

export const getAllAdvertisements = async () => {
    try {
        const response = await axiosInstance.get<Advertisement[]>('/api/advertisements')
        if (response.status === 200 ) {
            return response.data
        }
    } catch (error) {
        console.error(error)
        throw new Error('Lấy danh sách quảng cáo thất bại')
    }
}