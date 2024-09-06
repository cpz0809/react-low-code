import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AddOrEditVariableProps,
  ApiSingleProps,
  DelVariableProps,
  StateSingleProps,
  ContextStateProps,
  AddVariableProps
} from '../_types/context'
import { v4 as uuid } from 'uuid'

const initialState: ContextStateProps = {
  stateData: [
    {
      code: '75693de1-a29c-4696-b782-82904e6cc9f9',
      illustrate: '1',
      name: 'ddd',
      type: 'boolean',
      value: false
    },
    {
      code: '75693de1-a29c-4696-b782-82904e6cc9f2',
      illustrate: '',
      name: 'test',
      type: 'string',
      value: '1231312'
    }
  ],
  apiData: [],
  variableMap: {}
}

const variableSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addOrEditVariable(state, action: PayloadAction<AddOrEditVariableProps>) {
      const { type, data } = action.payload
      if (type === 'state') {
        addOrEdit<StateSingleProps>(data as StateSingleProps, state.stateData)
      } else if (type === 'api') {
        addOrEdit<ApiSingleProps>(data as ApiSingleProps, state.apiData)
      }
    },
    delVariable(state, action: PayloadAction<DelVariableProps>) {
      const { type, code } = action.payload
      if (type === 'state') {
        delData<StateSingleProps>(code, state.stateData)
      } else if (type === 'api') {
        delData<ApiSingleProps>(code, state.apiData)
      }
    },
    addVariableMap(state, action: PayloadAction<AddVariableProps>) {
      const { stateUuid, uuid, attr } = action.payload
      const data = state.variableMap[stateUuid]
      if (data) {
        data.push({ uuid, attr })
      } else {
        state.variableMap[stateUuid] = [{ uuid, attr }]
      }
    }
  }
})

const addOrEdit = <T extends { code: string }>(data: T, arr: T[]) => {
  if (!data.code) {
    arr.push({ ...data, code: uuid() })
  } else {
    const index = arr.findIndex((item) => item.code === data.code)
    arr[index] = data
  }
}

const delData = <T extends { code: string }>(code: string, arr: T[]) => {
  const index = arr.findIndex((item) => item.code === code)
  if (index !== -1) {
    arr.splice(index, 1)
  }
}

export const { addOrEditVariable, delVariable, addVariableMap } =
  variableSlice.actions
export default variableSlice.reducer
