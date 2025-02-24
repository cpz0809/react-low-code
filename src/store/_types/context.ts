export interface ContextStateProps {
  stateData: VariableSingleProps[]
  apiData: ApiSingleProps[]
  variableMap: VariableMapProps
  methods: { [key: string]: string }
}

export type StateTypeKeys =
  | 'String'
  | 'Number'
  | 'Bigint'
  | 'Boolean'
  | 'Symbol'
  | 'Undefined'
  | 'Object'
  | 'Function'
  | 'Array'

export interface VariableSingleProps {
  code: string
  name: string
  type: StateTypeKeys
  value: any
  illustrate: string
  category?: number
}

export interface EditStateProps {
  index: number
  params: VariableSingleProps
}

export type ApiRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ApiSingleProps {
  code: string
  name: string
  type: ApiRequestType
  url: string
  params: any
  isAutoRequest: boolean
}

export type VariableType = 'variable' | 'api'

export type AddOrEditVariableProps =
  | { type: 'variable'; data: VariableSingleProps }
  | { type: 'api'; data: ApiSingleProps }

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
