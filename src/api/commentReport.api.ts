import axiosInstance from '@/inteceptor/axiosInstance.ts'

export interface CommentReportFormData {
  commentId: number
  reason: string
  category: 'SCAM' | 'INAPPROPRIATE_CONTENT' | 'DUPLICATE' | 'MISINFORMATION' | 'OTHER'
}

export const submitCommentReport = async (report: CommentReportFormData) => {
  return axiosInstance.post('/api/comment-reports', report)
}
