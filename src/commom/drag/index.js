/* eslint-disable no-unused-vars */
import EventEmiter from '../eventEmiter'

const measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
]
const positionValues = {
  relative: true,
  absolute: true,
  fixed: true,
}

const extend = (a, b) => {
  for (let prop in b) {
    a[prop] = b[prop]
  }
  return a
}
// ...px => ...
const getStyleSize = (value) => {
  var num = parseFloat(value)
  var isValid = value.indexOf('%') === -1 && !isNaN(num)
  return isValid && num
}

const getSize = (element) => {
  if (typeof element === 'string') document.querySelector(element)
  if (!element || typeof element !== 'object' || !element.nodeType) return

  let style = getStyle(element)
  if (style.display === 'none') return getZeroSize()

  let size = {}

  size.width = element.offsetWidth
  size.height = element.offsetHeight

  let isBorderBox = (size.isBorderBox = style.boxSizing === 'border-box')

  // 获取所有尺寸
  for (let i = 0; i < measurements.length; i++) {
    let measurement = measurements[i]
    let value = style[measurement]
    let num = parseFloat(value)
    // ‘auto’ / 'none' = 0
    size[measurement] = !isNaN(num) ? num : 0
  }

  let paddingWidth = size.paddingLeft + size.paddingRight
  let paddingHeight = size.paddingTop + size.paddingBottom
  let marginWidth = size.marginLeft + size.marginRight
  let marginHeight = size.marginTop + size.marginBottom
  let borderWidth = size.borderLeftWidth + size.borderRightWidth
  let borderHeight = size.borderTopWidth + size.borderBottomWidth

  let styleWidth = getStyleSize(style.width)
  if (styleWidth !== false) {
    size.width = styleWidth + (isBorderBox ? 0 : paddingWidth + borderWidth)
  }

  let styleHeight = getStyleSize(style.height)
  if (styleHeight !== false) {
    size.height = styleHeight + (isBorderBox ? 0 : paddingHeight + borderHeight)
  }

  size.innerWidth = size.width - (paddingWidth + borderWidth)
  size.innerHeight = size.height - (paddingHeight + borderHeight)

  size.outerWidth = size.width + marginWidth
  size.outerHeight = size.height + marginHeight

  return size
}

const getZeroSize = () => {
  let size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  }
  for (let i = 0; i < measurements.length; i++) {
    size[measurements[i]] = 0
  }
  return size
}

const getStyle = (element) => {
  const style = getComputedStyle(element)
  if (!style) {
    console.error('error dom!')
  } else {
    return style
  }
}

const isEle = (ele) => ele instanceof HTMLElement

class Drag extends EventEmiter {
  constructor(element, options = {}) {
    super()
    this.element = isEle(element) ? element : document.querySelector(element)
    this.contain = options.containment || document.body
    this.options = extend({}, options)
    this._init()
  }
  _init() {
    const style = getStyle(this.element)
    this.position = {}
    this._getPosition(style)

    this.dragPoint = { x: 0, y: 0 }
    this.startPosition = extend({}, this.position)
    if (!positionValues[style.position])
      this.element.style.position = 'relative'
    this.enable()
    this.setHandles()
  }
  _getPosition(style) {
    let right = this._getCoordinates(style.right, 'width')
    let top = this._getCoordinates(style.top, 'height')

    this.position.right = isNaN(right) ? 0 : right
    this.position.top = isNaN(top) ? 0 : top

    this._addTranslateDeviation(style)
  }
  _getCoordinates(styleSide, measure) {
    if (styleSide.indexOf('%') !== -1) {
      let parentNodeSize = getSize(this.element.parentNode)
      return !parentNodeSize
        ? 0
        : (parseFloat(styleSide) / 100) * parentNodeSize[measure]
    }
    return parseInt(styleSide, 10)
  }
  _addTranslateDeviation({ transform }) {
    if (transform.indexOf('matrix') !== 0) return
    // matrix(1, 0, 0, 1, x, y)
    let matrixValues = transform.split(',')

    let xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4

    let translateX = parseInt(matrixValues[xIndex], 10)
    let translateY = parseInt(matrixValues[xIndex + 1], 10)
    this.position.right -= translateX
    this.position.top += translateY
  }
  enable() {
    this.isEnable = true
  }
  setHandles() {
    this.handle = this.options.handle
      ? isEle(this.options.handle)
        ? this.options.handle
        : document.querySelectorAll(this.options.handle)
      : this.element
    this.bindHandles()
  }
  bindHandles() {
    this._bindHandles(true)
  }
  unbindHandles() {
    this._bindHandles(false)
  }
  _bindHandles(isAdd) {
    let bindMethod = isAdd ? 'addEventListener' : 'removeEventListener'
    let touchAction = isAdd ? 'none' : ''
    this._bindStartEvent(this.handle, isAdd)
    this.handle[bindMethod]('click', this)

    // 覆盖浏览器触摸手势
    if (window.PointerEvent) this.handle.style.touchAction = touchAction
  }
  _bindStartEvent(element, isAdd) {
    console.log(1)
    let bindMethod = isAdd ? 'addEventListener' : 'removeEventListener'
    var startEvent = 'mousedown'
    if (window.PointerEvent) {
      startEvent = 'pointerdown'
    } else if ('ontouchstart' in window) {
      startEvent = 'touchstart'
    }
    element[bindMethod](startEvent, this)
  }
  pointerDown (event) {
    console.log(event)
  }
}

export default function(element, options) {
  return new Drag(element, options)
}
