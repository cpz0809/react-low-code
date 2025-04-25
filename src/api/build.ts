import { request } from '@/util/request'

export const buildProject = <T>(data: {
  projectCode: string
  type: string
}): Promise<T> => request.post('/build', data, { responseType: 'blob' })
