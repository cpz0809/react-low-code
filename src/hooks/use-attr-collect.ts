import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentClickAttr, updateParams } from '@/store/modules/drag.ts'
import { RootState } from '@/store'
import { isObject } from '@/util/is'
import { addOrEditVariable, addVariableMap } from '@/store/modules/context'
import { PaneItemEditKey } from '@/components/board/drawer-menu/com-lib-pane/Type'

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
  const binding = (
    paramsKey: string,
    source: string,
    uuid: string,
    isChangeAttr: boolean
  ) => {
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

    !isChangeAttr
      ? updateOther(paramsKey, {
          source: source,
          uuid
        })
      : updateAttr(obj)
  }

  const collect = (key: string, value: any) => {
    if (!isMapUpdate(key)) {
      updateAttr({ [key]: value })
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

  const updateOther = (key: string, attrMap: { [key: string]: any }) => {
    if (!currentClick) return
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: key as PaneItemEditKey,
        params: attrMap
      })
    )
    dispatch(updateCurrentClickAttr(attrMap))
  }

  const updateAttr = (attr: { [key: string]: any }) => {
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
    if (!isObject(attr)) return attr
    // 处理如loop hidden等属性映射
    if (attr.source && attr.uuid) {
      return toValue(attr)
    }
    // 处理 attr:{...{}}
    const temp = { ...attr } as any
    for (const key in temp) {
      const value = temp[key]
      temp[key] = toValue(value)
    }
    return temp

    function toValue(obj: { source: 'state' | 'api'; uuid: string }) {
      if (!isObject(obj)) return obj
      const temp = { ...obj } as any
      if (temp.source === 'state') {
        const data = stateData.find((item) => item.code === temp.uuid)
        return data?.value
      }
      return null
    }
  }
  return { collect, binding, mergeSelect, mapValue }
}
