export interface ApiStateType {
  apiData: ApiSingleProps[]
}

export type ApiType = 'get' | 'post' | 'put' | 'delete'

export interface ApiSingleProps {
  name: string
  type: ApiType
  url: string
  params: any
  autoSave: boolean
}

export interface EditApiProps {
  index: number
  params: ApiSingleProps
}
