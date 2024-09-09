import './style/index.scss'
import VariableBinding from '@/components/board/variable-binding/VariableBinding'
import { VariableBindingRowProps } from './type'
import { useState } from 'react'
import VariableBindingIcon from '@/assets/icon/variable-binding.png'
import { getPrefixCls } from '@/util/global-config'
import BindingDropdown from '../binding-dropdown/BindingDropdown'
import { Button, MenuProps } from 'antd'
const VariableBindingRow = ({
  title,
  isDropdown = false,
  paramsKey,
  isChangeAttr = true,
  children
}: VariableBindingRowProps) => {
  const prefixCls = getPrefixCls('variable-binding-row')
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState(['static'])
  const [variableBindingName, setVariableBindingName] = useState<string | null>(
    null
  )
  const handleDropDownClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'state') {
      setVisible(true)
    }
    setSelectedKeys([key])
  }
  return (
    <>
      <div className={`${prefixCls}`}>
        <p className="label-title">{title}</p>
        <div className={`${prefixCls}-content`}>
          {selectedKeys[0] === 'static' || !isDropdown ? (
            children
          ) : (
            <Button type="link">已绑定：{variableBindingName || '-'}</Button>
          )}
        </div>

        {isDropdown ? (
          <BindingDropdown
            selectedKeys={selectedKeys}
            onClick={handleDropDownClick}
          />
        ) : (
          <img
            onClick={() => setVisible(true)}
            src={VariableBindingIcon}
            alt="icon"
            className={`${prefixCls}-icon`}
          />
        )}
      </div>

      <VariableBinding
        isChangeAttr={isChangeAttr}
        visible={visible}
        paramsKey={paramsKey}
        onClose={() => setVisible(false)}
        onSuccess={(name: string) => setVariableBindingName(name)}
      />
    </>
  )
}

export default VariableBindingRow
