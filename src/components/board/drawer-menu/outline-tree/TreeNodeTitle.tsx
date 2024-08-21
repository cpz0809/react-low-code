import {
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { getPrefixCls } from '@/util/global-config.ts'
import { remove, updateParams } from '@/store/modules/drag.ts'
import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import React, { useState, useRef, useEffect } from 'react'

const TreeNodeTitle = ({ data }: { data: PaneItemType }) => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('tree-node')

  // 修改组件名称输入框
  const editNameRef = useRef<HTMLInputElement>(null)
  // 修改组件名称状态
  const [editNameStatus, setEditNameStatus] = useState<boolean>(false)
  // 修改组件名称输入框值
  const [editNameValue, setEditNameValue] = useState<string>('')
  // 修改组件名称uuid
  const [editNameUuid, setEditNameUuid] = useState<string>('')

  useEffect(() => {
    handleEditNameInput()
  }, [editNameStatus, editNameValue])
  // 修改组件名称输入框
  const handleEditNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditNameValue(e.target.value)
  }
  // 点击修改按钮
  const handleEditNameInput = () => {
    if (!editNameStatus || !editNameRef.current) return
    editNameRef.current.focus()
    editNameRef.current.select()
  }
  const handleEditNameInputBlur = () => {
    dispatch(
      updateParams({
        uuid: editNameUuid,
        key: 'name',
        params: editNameValue
      })
    )
    setEditNameStatus(false)
  }

  const TreeExpand = (item: PaneItemType) =>
    item.children.length > 0 ? (
      <div className={`${prefix}-title-expand-btn`}>
        <DownOutlined />
      </div>
    ) : (
      <i className={`${prefix}-expand-placeholder`} />
    )

  const TreeAction = (item: PaneItemType) => (
    <div className={`${prefix}-actions`}>
      <div
        className={`${prefix}-action-btn`}
        onClick={() =>
          dispatch(
            updateParams({
              uuid: item.uuid,
              key: 'hidden',
              params: !item.hidden
            })
          )
        }
      >
        {item.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </div>
      <div
        className={`${prefix}-action-btn`}
        onClick={() => setEditNameStatus(true)}
      >
        <SettingOutlined />
      </div>
      <div
        className={`${prefix}-action-btn`}
        onClick={() => dispatch(remove(item.uuid))}
      >
        <DeleteOutlined />
      </div>
    </div>
  )

  return (
    <div className={`${prefix}-title`}>
      <div className={`${prefix}-title-left`}>
        {data.type !== PaneItemTypes.Main && TreeExpand(data)}
        <div className={`${prefix}-node-icon`}>
          <img src={data?.svg} alt={data?.name} />
        </div>
        <div className={`${prefix}-node-label`}>
          {editNameStatus ? (
            <input
              onChange={(e) => handleEditNameInputChange(e)}
              onFocus={() => {
                setEditNameValue(data.name)
                setEditNameUuid(data.uuid)
              }}
              onBlur={handleEditNameInputBlur}
              ref={editNameRef}
              value={editNameValue}
            />
          ) : (
            <span>{data?.name}</span>
          )}
        </div>
      </div>
      {data.type !== PaneItemTypes.Main && (
        <div className={`${prefix}-title-right`}>{TreeAction(data)}</div>
      )}
    </div>
  )
}
export default TreeNodeTitle
