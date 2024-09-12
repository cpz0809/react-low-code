export interface ContextStateProps {
  stateData: StateSingleProps[]
  apiData: ApiSingleProps[]
  variableMap: VariableMapProps
  methods: { [key: string]: string }
}

export type StateTypeKeys =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'array'

export interface StateSingleProps {
  code: string
  name: string
  type: StateTypeKeys
  value: any
  illustrate: string
}

export interface EditStateProps {
  index: number
  params: StateSingleProps
}

export type ApiRequestType = 'get' | 'post' | 'put' | 'delete'

export interface ApiSingleProps {
  code: string
  name: string
  type: ApiRequestType
  url: string
  params: any
  autoSave: boolean
}

export type VariableType = 'state' | 'api'

export interface AddOrEditVariableProps {
  type: VariableType
  data: StateSingleProps | ApiSingleProps
}

export interface DelVariableProps {
  type: VariableType
  code: string
}

interface VariableMapValueProps {
  uuid: string
  attr: string
}

type VariableMapProps = {
  [key: string]: VariableMapValueProps[]
}

export interface AddVariableProps {
  stateUuid: string
  uuid: string
  attr: string
}

export interface AddMethod {
  name: string
  value: string
}
