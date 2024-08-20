import axiosInstance from '@/inteceptor/axiosInstance.ts'

export interface ReportFormData {
  propertyId: number
  reason: string
  category: string
}

export const submitReport = async (report: ReportFormData) => {
  return axiosInstance.post('/api/reports', report)
}