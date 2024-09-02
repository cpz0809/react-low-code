import './index.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import {
  BarsOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  ProductOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import {
  setApiVisible,
  setOutlineTreeVisible,
  setPaneVisible,
  setVariableVisible
} from '@/store/modules/view.ts'

const Sidebar = () => {
  const prefix = getPrefixCls('drag')
  const dispatch = useDispatch()

  const align = {
    offset: [22, 0]
  }

  return (
    <>
      <div className={`${prefix}-container`}>
        <div className={`${prefix}-top`}>
          <div onClick={() => dispatch(setOutlineTreeVisible())}>
            <Tooltip title="大纲树" placement="right" align={align}>
              <BarsOutlined />
            </Tooltip>
          </div>
          <div onClick={() => dispatch(setPaneVisible())}>
            <Tooltip title="组件库" placement="right" align={align}>
              <ProductOutlined />
            </Tooltip>
          </div>
          <div onClick={() => dispatch(setApiVisible())}>
            <Tooltip title="页面接口" placement="right" align={align}>
              <GlobalOutlined />
            </Tooltip>
          </div>
          <div onClick={() => dispatch(setVariableVisible())}>
            <Tooltip title="页面变量" placement="right" align={align}>
              <DatabaseOutlined />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
