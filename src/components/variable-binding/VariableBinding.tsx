import { RootState } from '@/store'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'

const VariableBinding = () => {
  const { variableBindingVisible } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const handleOk = () => {}
  const handleCancel = () => {}
  return (
    <Modal
      open={variableBindingVisible}
      okText="确认"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    ></Modal>
  )
}

export default VariableBinding
