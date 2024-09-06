import { Button, Dropdown, MenuProps } from 'antd'
import { BindingDropdownProps } from './type'
import { SwapOutlined } from '@ant-design/icons'

const BindingDropdown = ({ onClick, selectedKeys }: BindingDropdownProps) => {
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
  return (
    <Dropdown
      menu={{
        items,
        onClick,
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
  )
}

export default BindingDropdown
