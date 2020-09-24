const isDomElement = function (arg1) {
  const element = arg1
  try {
    return element instanceof HTMLElement
  } catch(e) {
    return ((typeof element === 'object') &&
            (element.nodeType === 1) &&
            (typeof element.style === 'object') &&
            (typeof element.ownerDocument === 'object'))
  }
}

const elemHasId = function (arg1) {
  const element = arg1
  return typeof element.id != 'undefined' && element.id != ''
}

const elemGetId = function (arg1) {
  const element = arg1
  if (!elemHasId(element)) {
    return 'NULL'
  }
  return element.id
}

export {
  isDomElement,
  elemHasId,
  elemGetId
}
