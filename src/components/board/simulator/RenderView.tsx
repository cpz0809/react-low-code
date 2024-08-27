import './style/render-view.scss'
import { RootState } from '@/store'
import { getPrefixCls } from '@/util/global-config'
import { arrayToTree } from '@/util/node'
import { forwardRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import ViewProvider from '../drop/ViewProvider'
import { PaneItemType } from '../drawer-menu/com-lib-pane/Type'

const RenderView = forwardRef((_props, ref) => {
  const prefix = getPrefixCls('simulator')
  const { itemList } = useSelector((state: RootState) => state.dragSplice)
  // 渲染子节点
  const renderItem = useCallback(
    (data: PaneItemType) => ViewProvider(data),
    [itemList]
  )

  return (
    <div className={`${prefix}-render-wrapper`}>
      <div
        className={`${prefix}-render-content`}
        ref={(ref as any)?.current?.treeRoot}
      >
        {arrayToTree(itemList).map((item) => renderItem(item))}
      </div>
    </div>
  )
})

export default RenderView
