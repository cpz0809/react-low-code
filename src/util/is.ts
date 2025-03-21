const opt = Object.prototype.toString

export const isArray = (obj: any) => {
  return opt.call(obj) === '[object Array]'
}

export const isObject = (obj: any) => {
  return opt.call(obj) === '[object Object]'
}

export const isEmptyObject = (obj: any) => {
  return (
    Object.keys(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  )
}
