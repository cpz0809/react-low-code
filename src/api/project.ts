import { request } from '@/util/request'

// 查询项目列表
export const queryProjectList = <T>(teamCode: string): Promise<T> =>
  request.get(`/project/list?teamCode=${teamCode}`)

// 创建项目
export const createProject = <T>(data: {
  projectName: string
  teamCode: string
}): Promise<T> => request.post(`/project/create`, data)
