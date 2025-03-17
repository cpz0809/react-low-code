import { request } from '@/util/request'

// 查询组件
export const queryComponentList = <T>(pageCode: string): Promise<T> =>
  request.get(`/component/list`, { params: { pageCode } })

// 保存组件
export const saveComponent = (data: any) =>
  request.post('/component/save', data)

// 修改组件样式
export const updateComponentStyle = (data: any) =>
  request.post('/component/update/style', data)

// 修改组件样式
export const updateComponentName = (data: any) =>
  request.post('/component/update/name', data)

// 修改组件样式
export const updateComponentIsShow = (data: any) =>
  request.post('/component/update/isShow', data)

// 删除组件
export const removeComponents = (uuids: any) =>
  request.delete('/component/delete', { data: uuids })
