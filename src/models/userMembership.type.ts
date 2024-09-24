

export interface UserMembership {
    id: number
    userId: number
    membershipId: number
    priorityLimit: number
    refreshLimit: number
    priorityUsed: number
    refreshUsed: number
    status: UserMembershipStatus
    startDate: string
    endDate: string
}

export enum UserMembershipStatus {
    EXPIRED = 'EXPIRED',
    ACTIVE = 'ACTIVE'
}