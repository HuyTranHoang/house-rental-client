import { submitCommentReport } from '@/api/commentReport.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSubmitCommentReport = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitCommentReport,
    onSuccess: () => {
      toast.success('Báo cáo vi phạm của bạn đã được gửi!')
    },
    onError: () => {
      toast.error('Gửi báo cáo thất bại!')
    }
  })

  return { submitCommentReport: mutateAsync, submitCommentReportIsPending: isPending }
}
