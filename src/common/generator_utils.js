
export function removeParens(codeStr) {
  if (codeStr && codeStr[0] === '(') {
    return codeStr.substring(1, codeStr.length - 1)
  }
  return codeStr
}