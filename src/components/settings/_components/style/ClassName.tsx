import { Input, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { getPrefixCls } from '@/util/global-config.ts'

const ClassName = () => {
  const prefixCls = getPrefixCls('edit-style-field')
  const handleBlur = () => {}
  return (
    <div className={`${prefixCls}-class-name`}>
      <Input placeholder="请输入组件类名" onBlur={handleBlur} />
      <Tooltip
        title="填写类名后可将行内样式在打包后转为.css文件样式"
        placement="topLeft"
      >
        <InfoCircleOutlined className={`${prefixCls}-class-name-tips`} />
      </Tooltip>
    </div>
  )
}
export default ClassName
