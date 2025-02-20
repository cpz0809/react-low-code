import { request } from '@/util/request.ts'

// 查询页面
export const queryPageList = <T>(projectCode: string): Promise<T> =>
  request.get('/page/list', { params: { projectCode } })
