import { getPrefixCls } from '@/util/global-config.ts'
import './index.scss'

const DragTips = () => {
  const prefixCls = getPrefixCls('drag-tips')
  return <div className={`${prefixCls}`}>拖拽组件或模板到这里</div>
}
export default DragTips
