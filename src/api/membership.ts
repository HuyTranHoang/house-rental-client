import axiosInstance from "@/inteceptor/axiosInstance"
import { Membership } from "@/models/membership.type"
import { toast } from "sonner"

export const fetchAllMemberships = async () => {
    try {
      const response = await axiosInstance.get<Membership[]>('/api/membership/all')
      return response.data
    } catch (error) {
      toast.error('Không thể lấy dữ liệu hạng mức thành viên')
    }
  }