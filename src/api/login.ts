import { request } from '@/util/request'

interface LoginParams {
  username: string
  password: string
}

export const login = <T>(data: LoginParams): Promise<T> =>
  request.post('/login', data)
