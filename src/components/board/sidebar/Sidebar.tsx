import './index.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import {
  BarsOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  JavaScriptOutlined,
  ProductOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setApiVisible,
  setOutlineTreeVisible,
  setPaneVisible,
  setProgramVisible,
  setVariableVisible
} from '@/store/modules/view.ts'
import { RootState } from '@/store'
const Sidebar = () => {
  const prefix = getPrefixCls('drag')
  const dispatch = useDispatch()
  const {
    variableVisible,
    apiVisible,
    paneVisible,
    programVisible,
    outlineTreeVisible
  } = useSelector((state: RootState) => state.viewSplice)

  const align = {
    offset: [22, 0]
  }

  return (
    <div className={`${prefix}-container`}>
      <div className={`${prefix}-top`}>
        <div onClick={() => dispatch(setOutlineTreeVisible())}>
          <Tooltip title="大纲树" placement="right" align={align}>
            <BarsOutlined
              style={{ color: outlineTreeVisible ? '#1677ff' : '' }}
            />
          </Tooltip>
        </div>
        <div onClick={() => dispatch(setPaneVisible())}>
          <Tooltip title="组件库" placement="right" align={align}>
            <ProductOutlined style={{ color: paneVisible ? '#1677ff' : '' }} />
          </Tooltip>
        </div>
        <div onClick={() => dispatch(setApiVisible())}>
          <Tooltip title="页面接口" placement="right" align={align}>
            <GlobalOutlined style={{ color: apiVisible ? '#1677ff' : '' }} />
          </Tooltip>
        </div>
        <div onClick={() => dispatch(setVariableVisible())}>
          <Tooltip title="页面变量" placement="right" align={align}>
            <DatabaseOutlined
              style={{ color: variableVisible ? '#1677ff' : '' }}
            />
          </Tooltip>
        </div>
        <div onClick={() => dispatch(setProgramVisible())}>
          <Tooltip title="源码面板" placement="right" align={align}>
            <JavaScriptOutlined
              style={{ color: programVisible ? '#1677ff' : '' }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
