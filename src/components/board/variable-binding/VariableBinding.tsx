import './style/index.scss'
import { getPrefixCls } from '@/util/global-config'
import { Modal } from 'antd'
import { useState } from 'react'
import { VariableBindingProps } from './type'
import { useAttrCollect } from '@/hooks/use-attr-collect'
import { StateSingleProps } from '@/store/_types/variable'

const VariableBinding = ({
  visible,
  paramsKey,
  onClose,
  onSuccess
}: VariableBindingProps) => {
  const { binding, mergeSelect } = useAttrCollect()
  const prefixCls = getPrefixCls('variable-binding')
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeCode, setActiveCode] = useState<any>(null)

  const handleOk = () => {
    const data = mergeSelect[activeIndex].data.find(
      (item) => item.code === activeCode
    )
    if (!data) return
    binding(paramsKey, 'state', (data as StateSingleProps).code)
    onClose()
    if (onSuccess) onSuccess((data as StateSingleProps).name)
  }
  const handleCancel = () => {
    onClose()
  }
  return (
    <Modal
      open={visible}
      okText="确认"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
      zIndex={10001}
      title="数据绑定"
    >
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-tabs`}>
          <div className={`${prefixCls}-tabs-body`}>
            {mergeSelect.map((item, index) => (
              <div
                key={item.key}
                onClick={() => setActiveIndex(index)}
                className={`${prefixCls}-tabs-key 
                ${activeIndex === index ? `${prefixCls}-tabs-active-key` : ''}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className={`${prefixCls}-list-ui`}>
          {mergeSelect[activeIndex].data.map((item) => (
            <div
              key={item.code}
              className={`${prefixCls}-list-li  
              ${item.code === activeCode ? `${prefixCls}-list-li-active` : ''}`}
              onClick={() => setActiveCode(item.code)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default VariableBinding
