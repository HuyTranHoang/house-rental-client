import axiosInstance from '@/inteceptor/axiosInstance.ts'

export interface ReportFormData {
  propertyId: number
  reason: string
  category: 'SCAM' | 'INAPPROPRIATE_CONTENT' | 'DUPLICATE' | 'MISINFORMATION' | 'OTHER'
}

export const submitReport = async (report: ReportFormData) => {
  return axiosInstance.post('/api/reports', report)
}
