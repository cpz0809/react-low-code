import { request } from '@/util/request'

// 查询api列表
export const queryApiList = <T>(pageCode: string): Promise<T> =>
  request.get('/api/list', { params: { pageCode } })

// 新增api
export const addApi = (data: any) => request.post('/api/add', data)

// 修改api
export const updateApi = (data: any) => request.put('/api/update', data)

// 删除api
export const deleteApi = (codes: any) =>
  request.delete(`/api/delete?codes=${codes}`)
