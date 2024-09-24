import axiosInstance from "@/inteceptor/axiosInstance"
import { UserMembership } from "@/models/userMembership.type"
import { toast } from "sonner"

export const fetchByUserId = async ( userId : number) => {
    try {
      const response = await axiosInstance.get<UserMembership>(`/api/user-membership/${userId}`)
      return response.data
    } catch (error) {
      toast.error('Không thể lấy dữ liệu hạng mức của người dùng')
    }
  }