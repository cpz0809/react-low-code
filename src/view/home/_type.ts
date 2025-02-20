import { CommonType } from '@/common/types/common'

export interface TeamItem extends CommonType {
  teamName: string
  teamCode: string
  permission: number
}

export interface ProjectItem extends CommonType {
  code: string
  coverImage: string
  projectBgColor: string
  projectName: string
  projectIntroduce: string
}
