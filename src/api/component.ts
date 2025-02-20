import { request } from '@/util/request'

// 查询组件
export const queryComponentList = <T>(pageCode: string): Promise<T> =>
  request.get(`/component/list`, { params: { pageCode } })

// 保存组件
export const saveComponent = (data: any) =>
  request.post('/component/save', data)
