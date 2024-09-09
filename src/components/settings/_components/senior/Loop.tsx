import { useState } from 'react'
import { Button, Modal } from 'antd'
import EditCollapse from '../edit-collapse/EditCollapse'
import VariableBindingRow from '../variable-binding-row/VariableBindingRow'
import MonacoEdit from '@monaco-editor/react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentClick, updateParams } from '@/store/modules/drag'
import { RootState } from '@/store'
const Loop = () => {
  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const [visible, setVisible] = useState(false)
  const [editorValue, setEditorValue] = useState('')
  const handleOk = () => {
    if (!currentClick) return
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'loop',
        params: JSON.parse(editorValue)
      })
    )
    dispatch(setCurrentClick(null))
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const handleEditorChange = (e: string | undefined) => {
    if (!e) return
    setEditorValue(e)
  }
  return (
    <>
      <EditCollapse title="循环" isCollapse={true} isConfig={false}>
        <VariableBindingRow
          isDropdown={true}
          title="循环数据"
          paramsKey="loop"
          isChangeAttr={false}
        >
          <Button
            size="small"
            onClick={() => {
              setVisible(true)
              setEditorValue(
                currentClick?.loop ? JSON.stringify(currentClick?.loop) : ''
              )
            }}
            type={currentClick?.loop ? 'primary' : 'default'}
          >
            绑定数据
          </Button>
        </VariableBindingRow>
      </EditCollapse>

      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="循环数据"
        destroyOnClose={true}
        okText="确认"
        cancelText="取消"
        zIndex={10001}
      >
        <MonacoEdit
          value={editorValue}
          language="javascript"
          height={400}
          theme="vs"
          options={{
            tabSize: 2,
            fixedOverflowWidgets: false
          }}
          onChange={handleEditorChange}
        />
      </Modal>
    </>
  )
}

export default Loop
