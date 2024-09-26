
import { Membership } from "@/types/membership.type"
import axios from "axios"
import { toast } from "sonner"

export const fetchAllMemberships = async () => {
    try {
      const response = await axios.get<Membership[]>('/api/membership/all')
      return response.data
    } catch (error) {
      toast.error('Không thể lấy dữ liệu hạng mức thành viên')
    }
  }