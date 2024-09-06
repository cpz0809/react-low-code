import { Switch } from 'antd'
import EditCollapse from '../edit-collapse/EditCollapse'
import './style/index.scss'
import { getPrefixCls } from '@/util/global-config'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setCurrentClick, updateParams } from '@/store/modules/drag'
import { PaneItemEditKey } from '@/components/board/drawer-menu/com-lib-pane/Type'
import Loop from './Loop'

const Senior = () => {
  const dispatch = useDispatch()
  const prefixCls = getPrefixCls('edit-senior')
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const [isHidden, setIsHidden] = useState(true)
  const changeParams = (
    key: PaneItemEditKey,
    params: any,
    callback: () => void
  ) => {
    if (!currentClick) return
    dispatch(
      updateParams({
        uuid: currentClick?.uuid,
        key,
        params: !params
      })
    )
    callback()
  }
  return (
    <>
      <div className={`${prefixCls}`}>
        <EditCollapse title="是否渲染" paramsKey="hidden">
          <Switch
            value={isHidden}
            onChange={(e) =>
              changeParams('hidden', e, () => {
                setIsHidden(e)
                dispatch(setCurrentClick(null))
              })
            }
          />
        </EditCollapse>
        <Loop />
      </div>
    </>
  )
}

export default Senior
