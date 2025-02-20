import { request } from '@/util/request'

// 查询api列表
export const queryVariableList = <T>(pageCode: string): Promise<T> =>
  request.get('/variable/list', { params: { pageCode } })

// 新增variable
export const addVariable = (data: any) => request.post('/variable/add', data)

// 修改variable
export const updateVariable = (data: any) =>
  request.put('/variable/update', data)

// 删除variable
export const deleteVariable = (codes: any) =>
  request.delete(`/variable/delete?codes=${codes}`)
