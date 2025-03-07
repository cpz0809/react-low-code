import { useSelector, useDispatch } from 'react-redux'
import {
  setCurrentClick,
  updateCurrentClick,
  updateParams
} from '@/store/modules/drag.ts'
import { RootState } from '@/store'
import { isObject } from '@/util/is.ts'
import { addOrEditVariable, addVariableMap } from '@/store/modules/context.ts'
import { PaneItemEditKey } from '@/components/board/_types/util.ts'

export const useAttrCollect = () => {
  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const { apiData, stateData, variableMap } = useSelector(
    (state: RootState) => state.contextSlice
  )

  const mergeSelect = [
    {
      key: 'variable',
      name: '变量数据',
      data: apiData
    },
    {
      key: 'api',
      name: '接口数据',
      data: stateData
    }
  ]

  /**
   * 属性绑定
   * @param type 绑定的数据来源 1变量 2接口
   * @param paramsKey 属性key
   * @param source  属性值
   * @param code 数据code
   * @param isChangeAttr 是否修改自定义属性
   */
  const binding = (
    paramsKey: string,
    source: string,
    code: string,
    isChangeAttr: boolean
  ) => {
    if (!currentClick) return

    dispatch(
      addVariableMap({
        uuid: currentClick.uuid,
        stateUuid: code,
        attr: paramsKey
      })
    )
    // 处理自定义属性
    if (isChangeAttr) {
      updateAttr({ [paramsKey]: { source, code } })
      return
    }
    // 处理自带属性
    updateOther(paramsKey, { source, code })
  }

  /**
   * 收集属性
   * @param key 组件属性key
   * @param value 组件属性值
   * @param resetPointer 是否重置指针
   */
  const collect = (key: string, value: any, resetPointer: boolean = false) => {
    // 如果自定义属性存在该字段就是更新自定义属性
    if (!isMapUpdate(key)) {
      updateAttr({ [key]: value })
      if (resetPointer) {
        dispatch(setCurrentClick(null))
      }
      return
    }
    if (!currentClick) return
    // 反之查找到旧属性更新页面的state值
    for (const key in variableMap) {
      const arr = variableMap[key]
      for (let i = 0; i < arr.length; i++) {
        const data = arr[i]
        if (currentClick.uuid === data.uuid) {
          const oldData = stateData.find((item) => item.code === key)
          if (!oldData) return
          dispatch(
            addOrEditVariable({
              type: 'variable',
              data: {
                ...oldData,
                value
              }
            })
          )
          if (resetPointer) {
            dispatch(setCurrentClick(null))
          }
          break
        }
      }
    }
  }

  /**
   * 查找当前组件自定义属性是否存在key
   * @param key 自定义属性key
   */
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
    dispatch(
      updateCurrentClick({
        key: 'attr',
        params: attrMap
      })
    )
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
    dispatch(
      updateCurrentClick({
        key: 'attr',
        params: mergeAttr
      })
    )
  }

  /**
   * 属性映射值
   * @param attr 属性
   */
  const mapValue = (attr: any) => {
    // 如果不是Object | Array不需要映射
    if (!isObject(attr)) return attr
    // 处理如loop hidden等属性映射
    if (attr.source && attr.code) {
      return toValue(attr)
    }
    if (Array.isArray(attr)) return attr
    // 处理 attr:{...{}}
    const temp = { ...attr } as any
    for (const key in temp) {
      const value = temp[key]
      temp[key] = toValue(value)
    }
    return temp

    function toValue(obj: { source: 'variable' | 'api'; code: string }) {
      if (!isObject(obj)) return obj
      const temp = { ...obj } as any
      if (temp.source === 'variable') {
        const data = stateData.find((item) => item.code === temp.code)
        return data?.value
      }
      return null
    }
  }
  return { collect, binding, mergeSelect, mapValue }
}
