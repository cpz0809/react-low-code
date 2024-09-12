export function analysisStr(stateStr: string) {
  if (!stateStr.replace(/\s/g, '')) return null
  const stateContent = splitByCommaIgnoreInBrackets(stateStr)
  const res = stateContent.map((item) => {
    const arrStr = splitByColonWithoutSplittingInBrackets(
      item.trim().replace(/\\/g, '')
    )
    return {
      key: arrStr[0],
      value: JSON.parse(arrStr[1])
    }
  })
  return res
}

function splitByCommaIgnoreInBrackets(str: string) {
  const result = []
  let currentPart = ''
  let depth = 0
  for (const char of str) {
    if (char === '{') {
      depth++
    } else if (char === '}') {
      depth--
    } else if (char === '[') {
      depth++
    } else if (char === ']') {
      depth--
    }
    if (char === ',' && depth === 0) {
      result.push(currentPart.trim())
      currentPart = ''
    } else {
      currentPart += char
    }
  }
  if (currentPart.length > 0) {
    result.push(currentPart.trim())
  }
  return result
}

function splitByColonWithoutSplittingInBrackets(str: string) {
  let inBrackets = 0
  let currentPart = ''
  const parts = []
  for (const char of str) {
    if (char === '{') {
      inBrackets++
    } else if (char === '}') {
      inBrackets--
    }
    if (char === ':' && inBrackets === 0) {
      parts.push(currentPart)
      currentPart = ''
    } else {
      currentPart += char
    }
  }
  if (currentPart.length > 0) {
    parts.push(currentPart)
  }
  return parts
}
