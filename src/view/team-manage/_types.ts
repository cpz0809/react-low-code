import { CommonType } from '@/common/types/common.ts'

export interface MemBerItem extends CommonType {
  userCode: string
  nikeName: string
  permission: number
  email: string
  mobile: string
  avatar: string
}

export interface TeamItem extends CommonType {
  code: string
  teamName: string
}
