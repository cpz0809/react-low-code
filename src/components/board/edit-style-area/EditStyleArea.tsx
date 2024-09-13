import './style/index.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import EditAttrTabs from '@/components/board/edit-style-area/EditAttrTabs.tsx'
import { useEffect, useState } from 'react'
import EditRenderMain from '@/components/board/edit-style-area/EditRenderMain.tsx'
import { EditableTypeItem } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const EditStyleArea = () => {
  const prefixCls = getPrefixCls('esa')

  const { currentClick } = useSelector((state: RootState) => state.dragSplice)

  const [activeKey, setActiveKey] = useState<EditableTypeItem>('attr')

  useEffect(() => {
    setActiveKey('attr')
  }, [currentClick?.uuid])

  return (
    <div className={`${prefixCls}-container`}>
      {!currentClick ? (
        <div className={`${prefixCls}-empty`}>请在左侧画布选中节点</div>
      ) : (
        <>
          <div className={`${prefixCls}-current-component`}>
            <img src={currentClick.svg} alt={currentClick.name} />
            <p>{currentClick.name}</p>
          </div>
          <EditAttrTabs
            types={currentClick.editableType}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
          <EditRenderMain paneItem={currentClick} type={activeKey} />
        </>
      )}
    </div>
  )
}
export default EditStyleArea
