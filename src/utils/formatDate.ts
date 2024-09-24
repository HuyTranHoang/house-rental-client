import { format, formatDistance, formatDistanceToNow, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import { UserMembership } from '@/models/userMembership.type.ts'

export function formatDate(createdAt: string | undefined): string {
  if (!createdAt) return ''

  const date = parseISO(createdAt)
  const now = new Date()
  const oneDayInMs = 24 * 60 * 60 * 1000

  if (now.getTime() - date.getTime() < oneDayInMs) {
    return formatDistanceToNow(date, { addSuffix: true, locale: vi })
  } else {
    return format(date, 'dd-MM-yyyy')
  }
}

export function formatJoinedDate(createdAt: string | undefined): string {
  if (!createdAt) return ''

  const date = parseISO(createdAt)
  const now = new Date()

  return formatDistance(date, now, { locale: vi })
}

export function formatDateWithTime(createdAt: string | undefined): string {
  if (!createdAt) return ''

  const date = parseISO(createdAt)
  return format(date, 'dd-MM-yyyy HH:mm')
}

export const calculateMembershipRemainingDays = (membership: UserMembership | undefined) => {
  if (!membership) return 0

  const endDate = new Date(membership.endDate)
  const today = new Date()
  const diffTime = endDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
