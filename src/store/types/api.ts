export interface ApiStateType {
  apiData: ApiSingleProps[]
}

export type ApiType = 'get' | 'post' | 'put' | 'delete'

export interface ApiSingleProps {
  code: string | null
  name: string
  type: ApiType
  url: string
  params: any
  autoSave: boolean
}
