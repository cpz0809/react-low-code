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
      name: 'imageArray',
      type: 'array',
      value: [1, 2, 3, 4]
    },
    {
      code: '75693de1-a29c-4696-b782-82334e6cc9f9',
      illustrate: '1',
      name: 'str',
      type: 'string',
      value: '1234654654'
    },
    {
      code: '22693de1-a29c-4696-b782-82334e6cc9f9',
      illustrate: '1',
      name: 'visible',
      type: 'boolean',
      value: false
    },
    {
      code: '22693de3-a29c-4696-b782-82334e6cc9f9',
      illustrate: '1',
      name: 'obj',
      type: 'object',
      value: {
        a: {},
        b: {}
      }
    }
  ],
  method: {},
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
    fullUpdate(state, action: PayloadAction<StateSingleProps[]>) {
      state.stateData = action.payload
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

export const { addOrEditVariable, delVariable, addVariableMap, fullUpdate } =
  variableSlice.actions
export default variableSlice.reducer
