import './style/index.scss'
import { getPrefixCls } from '@/util/global-config'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { VariableBindingProps } from './type'
import { useAttrCollect } from '@/hooks/use-attr-collect'
import { VariableSingleProps } from '@/store/_types/context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const VariableBinding = ({
  visible,
  paramsKey,
  isChangeAttr,
  onClose,
  onSuccess
}: VariableBindingProps) => {
  const { binding, mergeSelect } = useAttrCollect()

  const { apiData, stateData } = useSelector(
    (state: RootState) => state.contextSlice
  )
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const prefixCls = getPrefixCls('variable-binding')
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeCode, setActiveCode] = useState<any>(null)

  useEffect(() => {
    if (!currentClick || !currentClick.loop) return
    if (Array.isArray(currentClick.loop)) return
    let data
    if (currentClick.loop.category === 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data = stateData.find((item) => item.code === currentClick.loop.code)
      setActiveIndex(1)
    }

    if (currentClick.loop.category === 2) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data = apiData.find((item) => item.code === currentClick.loop.code)
      setActiveIndex(0)
    }
    if (!data) return
    setActiveCode(data.code)
  }, [])

  const handleOk = () => {
    const data = mergeSelect[activeIndex].data.find(
      (item) => item.code === activeCode
    )
    if (!data) return
    binding(
      paramsKey,
      activeIndex === 0 ? 'api' : 'variable',
      (data as VariableSingleProps).code,
      isChangeAttr
    )
    onClose()
    if (onSuccess) onSuccess((data as VariableSingleProps).name)
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
