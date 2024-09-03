export type StateSingleTypeProps =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'

export interface StateSingleProps {
  code: string | null
  name: string
  type: StateSingleTypeProps
  value: any
  illustrate: string
}

export interface StateType {
  stateData: StateSingleProps[]
}

export interface EditStateProps {
  index: number
  params: StateSingleProps
}
