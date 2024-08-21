import { CSSProperties } from 'react'

// 字符串转CSSProperties
export const strToCSSProperties = (str: string): CSSProperties => {
  const startIndex = str.indexOf('-')
  const endIndex = str.lastIndexOf('-')
  // 如果 startIndex && endIndex !== -1 说明是display:inline-block || background-color...样式
  if (startIndex !== -1 && endIndex !== -1) {
    const splitIndex = str.indexOf(':')
    if (splitIndex === -1) return {}
    // 如果startIndex === endIndex 说明只有一个 - 如果 - 在 : 之后说明是 display:inline-block 类型样式 不转换
    // (由于 startIndex = endIndex 只判断 startIndex > splitIndex )
    if (startIndex === endIndex && startIndex > splitIndex)
      return combinationStr(str)
    // 在之前需要将-前所有都转驼峰 border-top-left-radius background-color ...
    const temp = str.split(':')
    return combinationStr(`${strToHumpName(temp[0])}:${temp[1]}`)
  }
  // 未出现 说明是 width || height...
  return combinationStr(str)
}

const combinationStr = (str: string): CSSProperties => {
  const split = str.split(':')
  return {
    [split[0]]: split[1]
  }
}
// 字符串转驼峰
export const strToHumpName = (str: string) => {
  return str.replace(/-(.)?/g, (_, text: string) =>
    text ? text.toUpperCase() : text
  )
}
