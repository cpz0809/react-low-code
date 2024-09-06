import './style/index.scss'
import { getPrefixCls } from '@/util/global-config'
import { EditCollapseProps } from './type'
import { useState } from 'react'
import { DownOutlined, SwapOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import VariableBinding from '@/components/board/variable-binding/VariableBinding'

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
  const items: MenuProps['items'] = [
    {
      key: 'static',
      label: '静态变量'
    },
    {
      key: 'state',
      label: '动态变量'
    }
  ]
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
              <Dropdown
                menu={{
                  items,
                  onClick: handleDropDownClick,
                  selectedKeys
                }}
                placement="bottom"
                trigger={['click']}
              >
                <Button
                  style={{ width: 20, minWidth: 20, height: 20 }}
                  icon={<SwapOutlined />}
                  shape="circle"
                />
              </Dropdown>
              {isConfig && isCollapse && (
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
      <VariableBinding
        visible={visible}
        paramsKey={paramsKey}
        onClose={() => setVisible(false)}
        onSuccess={(name: string) => setVariableBindingName(name)}
      />
    </>
  )
}

export default EditCollapse
