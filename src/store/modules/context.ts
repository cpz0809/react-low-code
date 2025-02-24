import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AddOrEditVariableProps,
  ApiSingleProps,
  DelVariableProps,
  VariableSingleProps,
  ContextStateProps,
  AddVariableProps,
  AddMethod
} from '../_types/context'
import { v4 as uuid } from 'uuid'

const initialState: ContextStateProps = {
  stateData: [],
  methods: {},
  apiData: [],
  variableMap: {}
}

const variableSlice = createSlice({
  name: 'variable',
  initialState,
  reducers: {
    // 设置api数据
    setApiData(state, action: PayloadAction<ApiSingleProps[]>) {
      state.apiData = action.payload
    },
    // 设置variable数据
    setVariableData(state, action: PayloadAction<VariableSingleProps[]>) {
      state.stateData = action.payload
    },
    // 添加或修改
    addOrEditVariable(state, action: PayloadAction<AddOrEditVariableProps>) {
      const { type, data } = action.payload
      if (type === 'variable') {
        addOrEdit<VariableSingleProps>(
          data as VariableSingleProps,
          state.stateData
        )
      } else if (type === 'api') {
        addOrEdit<ApiSingleProps>(data as ApiSingleProps, state.apiData)
      }
    },
    // 删除
    delVariable(state, action: PayloadAction<DelVariableProps>) {
      const { type, code } = action.payload
      if (type === 'variable') {
        delData<VariableSingleProps>(code, state.stateData)
      } else if (type === 'api') {
        delData<ApiSingleProps>(code, state.apiData)
      }
    },
    // 更新变量值
    fullUpdate(state, action: PayloadAction<VariableSingleProps[]>) {
      state.stateData = action.payload
    },
    // 添加变量映射值
    addVariableMap(state, action: PayloadAction<AddVariableProps>) {
      const { stateUuid, uuid, attr } = action.payload
      const data = state.variableMap[stateUuid]
      if (data) {
        data.push({ uuid, attr })
      } else {
        state.variableMap[stateUuid] = [{ uuid, attr }]
      }
    },
    addOrEditMethod(state, action: PayloadAction<AddMethod>) {
      const { name, value } = action.payload
      state.methods[name] = value
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

export const {
  addOrEditVariable,
  delVariable,
  addVariableMap,
  fullUpdate,
  addOrEditMethod,
  setApiData,
  setVariableData
} = variableSlice.actions
export default variableSlice.reducer
