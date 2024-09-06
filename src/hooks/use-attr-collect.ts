import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentClickAttr, updateParams } from '@/store/modules/drag.ts'
import { RootState } from '@/store'
import { isObject } from '@/util/is'
import { addOrEditVariable, addVariableMap } from '@/store/modules/context'

export const useAttrCollect = () => {
  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const { apiData, stateData, variableMap } = useSelector(
    (state: RootState) => state.contextSlice
  )

  const mergeSelect = [
    {
      key: 'state',
      name: '变量数据',
      data: apiData
    },
    {
      key: 'api',
      name: '接口数据',
      data: stateData
    }
  ]

  // 属性绑定
  const binding = (paramsKey: string, source: string, uuid: string) => {
    const obj = {
      [paramsKey]: {
        source: source,
        uuid
      }
    }
    if (!currentClick) return
    dispatch(
      addVariableMap({
        uuid: currentClick.uuid,
        stateUuid: uuid,
        attr: paramsKey
      })
    )
    update(obj)
  }

  const collect = (key: string, value: any) => {
    if (!isMapUpdate(key)) {
      update({ [key]: value })
      return
    }
    if (!currentClick) return

    for (const key in variableMap) {
      const arr = variableMap[key]
      for (let i = 0; i < arr.length; i++) {
        const data = arr[i]
        if (currentClick.uuid === data.uuid) {
          const oldData = stateData.find((item) => item.code === key)
          if (!oldData) return
          dispatch(
            addOrEditVariable({
              type: 'state',
              data: {
                ...oldData,
                value
              }
            })
          )
          break
        }
      }
    }
  }

  const isMapUpdate = (key: string) => {
    const data = currentClick?.attr[key]
    return data && (data as any)['uuid'] && (data as any)['source']
  }

  const update = (attr: { [key: string]: any }) => {
    if (!currentClick) return
    const mergeAttr = {
      ...currentClick.attr,
      ...attr
    }
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'attr',
        params: mergeAttr
      })
    )
    dispatch(updateCurrentClickAttr(mergeAttr))
  }

  const mapValue = (attr: any) => {
    // 如果不是Object | Array不需要映射
    if (typeof attr !== 'object') return attr
    if (isObject(attr)) {
      const temp = { ...attr }
      for (const key in temp) {
        const value = temp[key]
        if (!isObject(value)) continue
        if (value.source === 'state') {
          const data = stateData.find((item) => item.code === value.uuid)
          temp[key] = data?.value
        }
      }
      return temp
    }
  }
  return { collect, binding, mergeSelect, mapValue }
}
