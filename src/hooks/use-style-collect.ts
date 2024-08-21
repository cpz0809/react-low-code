import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { updateCurrentClickStyle, updateParams } from '@/store/modules/drag.ts'
import { strToCSSProperties, strToHumpName } from '@/util/strToCSSProperties.ts'
import { CSSProperties } from 'react'
import {
  differentiate,
  StyleEnum
} from '@/components/settings/util/type/styleEnum.ts'

/**
 * 组件样式收集
 */
export const useStyleCollect = () => {
  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)

  // 收集
  const collect = (
    value: string | number | null,
    key?: string,
    suffix: string = 'px'
  ) => {
    if (!currentClick) return
    if (typeof value === 'number') {
      if (!key) return
      // 处理类似opacity属性不需要单位
      if (suffix === '') {
        update(strToCSSProperties(`${key}:${value}`))
        return
      }
      // 从组件中获取样式 如果没有说明不存在样式 使用默认单位
      const unit = (currentClick.style as any)[key]
      // 如果没有获取到使用默认单位
      if (!unit) update(strToCSSProperties(`${key}:${value}${suffix}`))
      // 否测使用匹配到的单位
      else update(strToCSSProperties(`${key}:${value}${matchingUnit(key)}`))
      return
    }
    // 如果value为空需或者属性已经存在删除对应的属性
    if (!value || isActive(value)) {
      const cloneStyle = { ...currentClick.style }
      if (key) {
        delete (cloneStyle as any)[strToHumpName(key)]
      } else {
        if (!value) return
        const split = value.split(':')
        delete (cloneStyle as any)[strToHumpName(split[0])]
      }
      update(cloneStyle, true)
    } else if (key && differentiate.includes(<StyleEnum>key)) {
      // 处理不需要单位的属性
      update(strToCSSProperties(`${key}:${value}`))
    } else {
      update(strToCSSProperties(value))
    }
  }
  // 更新单位
  const updateUnit = (
    key: string,
    oldUnit: string,
    newUnit: string,
    attrPosition?: number
  ) => {
    if (!currentClick || !oldUnit || !newUnit) return
    // 从组件中获取样式值
    const styleVal = (currentClick.style as any)[strToHumpName(key)]
    if (!styleVal) return
    // 如果需要改变的属性值是 1px 1px 格式
    if (attrPosition !== undefined) {
      const splitValue = styleVal.split(' ')
      splitValue[attrPosition] = splitValue[attrPosition].replace(
        oldUnit,
        newUnit
      )
      update(strToCSSProperties(`${key}:${splitValue.join(' ')}`))
    } else {
      // 普通格式
      const value = styleVal.replace(oldUnit, newUnit)
      update(strToCSSProperties(`${key}:${value}`))
    }
  }
  // 匹配样式
  const matchingStyle = (key: string, defaultValue?: string | number) => {
    if (!currentClick) return
    return (currentClick.style as any)[strToHumpName(key)] || defaultValue || 0
  }
  // 匹配单位
  const matchingUnit = (key: string, defaultUnit: string = 'px') => {
    if (!currentClick) return
    const value = (currentClick.style as any)[key]
    const regex = /px|%/
    if (!value) return defaultUnit
    return value.substring(value.search(regex))
  }
  // 是否选中
  const isActive = (value: string): boolean => {
    if (!currentClick || !value) return false
    const split = value.split(':')
    const key = (currentClick.style as any)[strToHumpName(split[0])]
    if (!key) return false
    return (currentClick.style as any)[strToHumpName(split[0])] === split[1]
  }
  // 更新
  const update = (style: CSSProperties, isDelete: boolean = false) => {
    if (!currentClick) return
    let mergeStyle
    if (!isDelete) {
      mergeStyle = {
        ...currentClick.style,
        ...style
      }
    } else {
      mergeStyle = { ...style }
    }
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'style',
        params: mergeStyle
      })
    )
    dispatch(updateCurrentClickStyle(mergeStyle))
  }
  return {
    collect,
    matchingStyle,
    matchingUnit,
    updateUnit,
    isActive
  }
}
