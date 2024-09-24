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

export const updateUserMembership =  async ( userId: number, membershipId: number ) => {
    try {
        const response = await axiosInstance.put(`/api/user-membership/${userId}`, {membershipId: membershipId});
        toast.success('Nâng hạng thành công');
        return response.data;
    } catch (error) {
        toast.error('Nâng hạng không thanh công');
        throw error;
    }
}