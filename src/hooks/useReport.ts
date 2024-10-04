import { submitReport } from '@/api/report.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSubmitReport = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      toast.success('Báo cáo vi phạm của bạn đã được gửi!')
    },
    onError: () => {
      toast.error('Gửi báo cáo thất bại!')
    }
  })

  return { submitReport: mutateAsync, isPending }
}
