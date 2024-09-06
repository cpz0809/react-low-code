import './style/index.scss'
import { getPrefixCls } from '@/util/global-config'
import { EditCollapseProps } from './type'
import { useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button, MenuProps, Space } from 'antd'
import VariableBinding from '@/components/board/variable-binding/VariableBinding'
import BindingDropdown from '../binding-dropdown/BindingDropdown'

const EditCollapse = ({
  title,
  isCollapse = false,
  isConfig = true,
  paramsKey,
  children
}: EditCollapseProps) => {
  const prefixCls = getPrefixCls('edit-collapse')

  const [visible, setVisible] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(true)
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
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{title}</div>
          <div className={`${prefixCls}-right`}>
            <Space>
              {isConfig && (
                <BindingDropdown
                  selectedKeys={selectedKeys}
                  onClick={(key) => handleDropDownClick(key)}
                />
              )}
              {isCollapse && (
                <span
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ cursor: 'pointer' }}
                >
                  {isOpen ? <UpOutlined /> : <DownOutlined />}
                </span>
              )}
            </Space>
          </div>
        </div>
        {isOpen && (
          <div className={`${prefixCls}-body`}>
            {selectedKeys[0] === 'static' ? (
              children
            ) : (
              <Button type="link">已绑定：{variableBindingName}</Button>
            )}
          </div>
        )}
      </div>
      {paramsKey && (
        <VariableBinding
          visible={visible}
          paramsKey={paramsKey}
          onClose={() => setVisible(false)}
          onSuccess={(name: string) => setVariableBindingName(name)}
        />
      )}
    </>
  )
}

export default EditCollapse
