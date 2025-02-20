import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Spin } from 'antd'
import { CanvasElement } from '@/view/project-manage/_types.ts'
import { useNavigate } from 'react-router-dom'

const ImageWidth = 350
const ImageHeight = 250
let ctx: CanvasRenderingContext2D | null

interface ProjectViewPropsType {
  pageData: CanvasElement[]
  setData: Dispatch<CanvasElement[]>
  currentElement: CanvasElement | null
  backgroundColor: string
  isLock: boolean
  scale: number
  setScale: Dispatch<SetStateAction<number>>
  setCurrentElement: Dispatch<SetStateAction<CanvasElement | null>>
  onContextMenu: (position: { x: number; y: number }, el: any) => void
  onCloseContextMenu: () => void
  contextMenuVisible: boolean
}

const ProjectView = forwardRef(
  (
    {
      pageData,
      setData,
      currentElement,
      backgroundColor,
      isLock,
      scale,
      setScale,
      onContextMenu,
      onCloseContextMenu,
      contextMenuVisible,
      setCurrentElement
    }: ProjectViewPropsType,
    ref
  ) => {
    const navigate = useNavigate()
    const canvas = useRef<HTMLCanvasElement>(null)
    // 是否拖拽画布
    const isDraggingCanvas = useRef(false)
    // 是否拖拽元素
    const isDraggingElement = useRef(false)
    // 鼠标按下位置
    const startPosition = useRef({ x: 0, y: 0 })
    // 开始拖拽位置
    const startDraggingPosition = useRef({ x: 0, y: 0 })
    // 缩放位置
    const scalePosition = useRef({ x: 0, y: 0 })
    // 是否缩放
    const isScale = useRef(false)
    // 加载状态
    const [isLoading, setIsLoading] = useState(true)
    // 是否是可移动光标
    const [isCursorMove, setCursorMove] = useState<boolean>(false)
    // 画布偏移位置
    const [touchPosition, setTouchPosition] = useState({
      x: 0,
      y: 0
    })

    useEffect(() => {
      if (!canvas.current) return
      ctx = canvas.current.getContext('2d')
      if (ctx) {
        canvas.current.addEventListener('wheel', handleWheel)
        window.addEventListener('keydown', handleWindowKeyDown)
        window.addEventListener('keyup', handleWindowKeyUp)
        return () => {
          if (!canvas.current) return
          // eslint-disable-next-line react-hooks/exhaustive-deps
          canvas.current.removeEventListener('wheel', handleWheel)
          window.removeEventListener('keydown', handleWindowKeyDown)
          window.removeEventListener('keyup', handleWindowKeyUp)
        }
      }
    }, [scale, touchPosition])

    useEffect(() => {
      requestAnimationFrame(render)
    }, [pageData, touchPosition, scale, backgroundColor, currentElement])

    useImperativeHandle(ref, () => ({
      scale: (value: number, type?: 1 | -1) => canvasScale(value, type)
    }))

    const render = () => {
      if (!canvas.current || !ctx) return
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)
      ctx.fill()
      ctx.translate(touchPosition.x, touchPosition.y)
      ctx.scale(scale, scale)
      pageData.forEach((item) => {
        if (!canvas.current || !ctx) return
        ctx.font = '28px SimHei'
        ctx.fillStyle = '#5F6166'
        if (!canvas.current || !ctx) return
        if (item.code === currentElement?.code) {
          ctx.strokeStyle = '#3762EC' // 边框颜色
          ctx.lineWidth = 2 // 边框宽度
          ctx.strokeRect(
            item.positionX - 1,
            item.positionY - 1,
            ImageWidth + 2,
            ImageHeight + 2
          )
          ctx.fillStyle = '#3762EC'
        }
        item.image.onload = () => {
          if (!ctx) return
          ctx.drawImage(
            item.image,
            item.positionX,
            item.positionY,
            ImageWidth,
            ImageHeight
          )
        }
        ctx.drawImage(
          item.image,
          item.positionX,
          item.positionY,
          ImageWidth,
          ImageHeight
        )
        ctx.fillText(item.pageName, item.positionX, item.positionY - 20)
        ctx.fill()
      })
      ctx.resetTransform()
      setIsLoading(false)
    }

    const handleContextMenu = (e: any) => {
      e.preventDefault()
      const element = isSelectedElement(e.clientX, e.clientY)
      if (!element) return
      setCurrentElement(element)
      onContextMenu({ x: e.clientX, y: e.clientY }, element)
    }

    const isSelectedElement = (x: number, y: number) => {
      const computeOffSet = (value: number, position: number) =>
        position === 0
          ? value
          : position < 0
            ? value + Math.abs(position)
            : value - position

      const computeScale = (value: number) => value * scale

      for (let i = 0; i < pageData.length; i++) {
        const item = pageData[i]
        const offsetX = computeOffSet(x, touchPosition.x)
        const offsetY = computeOffSet(y, touchPosition.y)
        const width = computeScale(item.positionX + ImageWidth)
        // 头部有页面名称需要多加一个值
        const height = computeScale(item.positionY + ImageHeight + 60)
        if (
          offsetX > computeScale(item.positionX) &&
          offsetX < width &&
          offsetY > computeScale(item.positionY) &&
          offsetY < height
        ) {
          return item
        }
      }
      return null
    }

    const handleMouseDown = (e: any) => {
      // 除了左键按下处理 其余的不处理
      if (e.button !== 0) return
      // 如果右键菜单是打开状态就关闭
      if (contextMenuVisible) {
        onCloseContextMenu()
      }
      // 当前按下位置是否有元素
      const element = isSelectedElement(e.clientX, e.clientY)
      // 如果不是锁定状态并且当前位置有元素 = 拖拽元素
      if (!isLock && element) {
        // 区分是点击还是长按
        isDraggingElement.current = true
        startPosition.current = {
          x: element.positionX,
          y: element.positionY
        }
        startDraggingPosition.current = {
          x: e.clientX - element.positionX,
          y: e.clientY - element.positionY
        }
      } else {
        // 只是移动画布位置
        isDraggingCanvas.current = true
        startPosition.current = { x: e.clientX, y: e.clientY }
      }
      setCurrentElement(element)
    }

    const handleMouseMove = (e: any) => {
      const deltaX = e.clientX - startPosition.current.x
      const deltaY = e.clientY - startPosition.current.y
      // 移动页面
      if (
        isDraggingElement.current &&
        currentElement &&
        !isLock &&
        !contextMenuVisible
      ) {
        const temp = [...pageData]
        const index = temp.findIndex(
          (item) => item.code === currentElement?.code
        )
        temp[index].positionX =
          startPosition.current.x + (deltaX - startDraggingPosition.current.x)
        temp[index].positionY =
          startPosition.current.y + (deltaY - startDraggingPosition.current.y)
        setCurrentElement(temp[index])
        setData(temp)
        return
      } else if (isDraggingCanvas.current) {
        // 拖拽画布
        setTouchPosition((prevOffset) => ({
          x: prevOffset.x + deltaX,
          y: prevOffset.y + deltaY
        }))
        startPosition.current = { x: e.clientX, y: e.clientY }
        scalePosition.current = {
          x: touchPosition.x + deltaX,
          y: touchPosition.y + deltaY
        }
      }
      // 改变光标
      setCursorMove(!!isSelectedElement(e.clientX, e.clientY))
    }

    const handleMouseUp = () => {
      isDraggingCanvas.current = false
      if (isDraggingElement.current) {
        isDraggingElement.current = false
      }
    }

    const handleWheel = (e: any) => {
      e.preventDefault()
      if (isScale.current) {
        const zoomFactor = 0.3
        const newScale = e.deltaY > 0 ? scale - zoomFactor : scale + zoomFactor
        canvasScale(newScale)
      }
    }
    /**
     * 画布放大缩小
     * @param value
     * @param type >0放大 || <=缩小
     */
    const canvasScale = (value: number, type?: 1 | -1) => {
      let temp = value
      if (type) {
        temp = type > 0 ? scale + value : scale - value
      }
      if (temp > 4 || temp < 0.01) return

      setScale(temp)
      // 默认从当前位置中心点放大
      if (startPosition.current.x === 0 && startPosition.current.y === 0) {
        startPosition.current = {
          x: window.outerWidth / 2,
          y: window.outerHeight / 2
        }
      }
      const diffScale = temp / scale
      const x =
        startPosition.current.x -
        (startPosition.current.x - scalePosition.current.x) * diffScale
      const y =
        startPosition.current.y -
        (startPosition.current.y - scalePosition.current.y) * diffScale
      setTouchPosition({ x: x, y: y })
      scalePosition.current = {
        x,
        y
      }
    }
    const handleWindowKeyDown = (e: any) => {
      if (e.key === 'Control') {
        isScale.current = true
      }
    }
    const handleWindowKeyUp = () => {
      if (isScale.current) {
        isScale.current = false
      }
    }

    const handleDoubleClick = () => {
      if (!currentElement) return
      navigate(`/assemble?pageCode=${currentElement.code}`)
    }

    // const handleClick = (e: any) => {
    //   // 如果右键菜单是打开状态就关闭
    //   if (isOpenContextMenu) {
    //     setIsOpenContextMenu(false)
    //     setContextMenuPosition({ x: 0, y: 0 })
    //   }
    //   const element = isSelectedElement(e.clientX, e.clientY)
    //   if (!element) {
    //     setCurrentElement(null)
    //     return
    //   }
    //   setCurrentElement(element)
    // }
    return (
      <>
        <canvas
          style={{ cursor: isCursorMove ? 'move' : 'default' }}
          className="project-manage-canvas"
          width={5760}
          height={1992}
          ref={canvas}
          // onClick={handleClick}
          onContextMenu={handleContextMenu}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        />
        <Spin spinning={isLoading} fullscreen />
      </>
    )
  }
)
export default ProjectView
