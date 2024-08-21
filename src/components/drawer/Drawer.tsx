import './index.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import React, { useRef, useEffect } from 'react'
import { UnlockOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useComputedCls } from '@/hooks/use-computed-cls.ts'
import { setBoardWidth, setComLibPaneLockStatus } from '@/store/modules/view.ts'
import { MOBILEDEFAULTSIZE } from '@/hooks/use-board-width.ts'

interface DrawerProps {
  show: boolean
  width?: number
  title: string
  drawerClassName?: string
  children: React.FunctionComponentElement<{ componentid: string }>
  onclose: () => void
}

const Drawer = ({
  show,
  width,
  title,
  drawerClassName = '',
  children,
  onclose
}: DrawerProps) => {
  const prefixCls = getPrefixCls('drawer')
  const dispatch = useDispatch()
  const { boardWidth, isComLibPaneLock } = useSelector(
    (state: RootState) => state.viewSplice
  )
  // 动态类名
  const cls = useComputedCls(
    [
      `${prefixCls}-container`,
      isComLibPaneLock ? `${prefixCls}-fix` : `${prefixCls}-float`
    ],
    [isComLibPaneLock]
  )
  // 抽屉内容宽度
  const drawerRef = useRef<HTMLDivElement>(null)
  // 网格窗口锁定或浮动状态改变
  const handleChangePaneStatus = () => {
    dispatch(setComLibPaneLockStatus())
  }
  // 关闭网格窗口
  const handleClosePane = () => {
    onclose()
  }

  useEffect(() => {
    if (drawerRef.current) {
      dispatch(setBoardWidth(computedBoardWidth()))
    }
  }, [show, isComLibPaneLock])
  // 计算画布宽度
  const computedBoardWidth = (): number => {
    const domWidth = document.documentElement.getBoundingClientRect().width
    const editStyleAreaWidth = 400
    const sidebarWidth = 48
    const boardPd = 16 * 2
    const drawerContentAttr = drawerRef.current?.getBoundingClientRect()
    if (!drawerContentAttr) return 0
    // 锁定状态宽度
    const lockWidth =
      domWidth -
      (drawerContentAttr.width + editStyleAreaWidth + sidebarWidth + boardPd)

    // 未锁定宽度
    const notLockWidth =
      domWidth - (editStyleAreaWidth + sidebarWidth + boardPd)
    if (boardWidth === MOBILEDEFAULTSIZE) return boardWidth
    return isComLibPaneLock ? lockWidth : notLockWidth
  }

  return (
    show && (
      <div className={`${cls} ${drawerClassName}`} style={{ width }}>
        <div className={`${prefixCls}-content`} ref={drawerRef}>
          <button
            className={`${prefixCls}-btn ${prefixCls}-fix`}
            onClick={() => handleChangePaneStatus()}
          >
            {isComLibPaneLock ? <UnlockOutlined /> : <LockOutlined />}
          </button>
          <button
            className={`${prefixCls}-btn ${prefixCls}-close`}
            onClick={handleClosePane}
          >
            <CloseOutlined />
          </button>
          <div className={`${prefixCls}-title`}>{title}</div>
          <div className={`${prefixCls}-body`}>{children}</div>
        </div>
      </div>
    )
  )
}

export default Drawer
