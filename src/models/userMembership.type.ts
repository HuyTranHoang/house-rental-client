export interface UserMembership {
    id: number
    userId: number
    username: string
    membershipId: number
    membershipName: string
    startDate: string
    endDate: string
    totalPriorityLimit: number
    totalRefreshLimit: number
    priorityPostsUsed: number
    refreshesPostsUsed: number
    status: UserMembershipStatus
}

export enum UserMembershipStatus {
    EXPIRED = 'EXPIRED',
    ACTIVE = 'ACTIVE'
}