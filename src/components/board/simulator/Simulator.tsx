import { getPrefixCls } from '@/util/global-config.ts'
import './style/index.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Operate from './Operate'
import RenderView from './RenderView'
import { useRef } from 'react'

const Simulator = () => {
  const prefix = getPrefixCls('simulator')
  const { boardWidth } = useSelector((state: RootState) => state.viewSplice)

  const SimulatorRef = useRef(null)
  return (
    <div className={`${prefix}-container`}>
      <div className={`${prefix}-content`} style={{ width: boardWidth }}>
        {/* 模拟器 */}
        <Operate ref={SimulatorRef} />
        {/* 渲染 */}
        <RenderView ref={SimulatorRef} />
      </div>
    </div>
  )
}

export default Simulator
