import { useEffect, useState } from 'react'

/**
 * className 处理
 * @param clsArr 需要处理的类名
 * @param params 依赖的参数
 */
export const useComputedCls = (clsArr: any[], params: any[] | any) => {

  const [cls, setCls] = useState<string>('')
  const deps = Array.isArray(params) ? params : [params]

  useEffect(() => {
    setCls(clsHandle(clsArr))
  }, deps)

  return cls
}

const clsHandle = (cls: any[]): string => {
  if (!Array.isArray(cls)) return ''
  let str: string = ''
  cls.forEach((item) => {
    if (typeof item === 'string') {
      str += `${item} `
    } else if (typeof item === 'object') {
      for (const key in item) {
        if (item[key]) {
          str += `${key} `
        }
      }
    }
  })
  return str
}
