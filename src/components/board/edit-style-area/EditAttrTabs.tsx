import './style/edit-attr-tabs.scss'
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { RootState } from '@/store'
import { getPrefixCls } from '@/util/global-config.ts'
import { EditableTypeItem } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const tabsNameMap = {
  attr: '属性',
  style: '样式',
  event: '事件',
  senior: '高级'
}

interface EditAttrTabsProps {
  types: EditableTypeItem[] | null
  activeKey: string
  setActiveKey: React.Dispatch<React.SetStateAction<EditableTypeItem>>
}

const EditAttrTabs = ({
  types,
  activeKey,
  setActiveKey
}: EditAttrTabsProps) => {
  const prefixCls = getPrefixCls('edit-attr-tabs')
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)

  useEffect(() => {
    setActiveKey('attr')
  }, [currentClick?.uuid])

  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-items`}>
        {types &&
          types.map((item) => {
            return (
              <div
                key={item}
                className={`${prefixCls}-item ${activeKey === item ? `${prefixCls}-item-active` : ''}`}
                onClick={() => setActiveKey(item)}
              >
                {tabsNameMap[item]}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default EditAttrTabs
