import './style/index.scss'
import VariableBinding from '@/components/board/variable-binding/VariableBinding'
import { VariableBindingRowProps } from './type'
import { useState } from 'react'
import VariableBindingIcon from '@/assets/icon/variable-binding.png'
import { getPrefixCls } from '@/util/global-config'
const VariableBindingRow = ({
  title,
  paramsKey,
  children
}: VariableBindingRowProps) => {
  const prefixCls = getPrefixCls('variable-binding-row')
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      <div className={`${prefixCls}`}>
        <p className="label-title">{title}</p>
        <div className={`${prefixCls}-content`}>{children}</div>
        <img
          onClick={() => setVisible(true)}
          src={VariableBindingIcon}
          alt="icon"
          className={`${prefixCls}-icon`}
        />
      </div>

      <VariableBinding
        visible={visible}
        paramsKey={paramsKey}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default VariableBindingRow
