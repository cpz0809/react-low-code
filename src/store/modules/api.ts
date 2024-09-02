import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiSingleProps, ApiStateType, EditApiProps } from '../types/api'

const initialState: ApiStateType = {
  apiData: []
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addApi(state, action: PayloadAction<ApiSingleProps>) {
      state.apiData.push(action.payload)
    },
    editApi(state, action: PayloadAction<EditApiProps>) {
      const { index, params } = action.payload
      state.apiData[index] = params
    },
    deleteApi(state, action: PayloadAction<string>) {
      const index = state.apiData.findIndex(
        (item) => item.name === action.payload
      )
      if (index !== -1) {
        state.apiData.splice(index, 1)
      }
    }
  }
})

export const { addApi, editApi,deleteApi } = apiSlice.actions
export default apiSlice.reducer
