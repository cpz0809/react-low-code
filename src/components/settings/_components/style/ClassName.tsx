import { Input, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { getPrefixCls } from '@/util/global-config.ts'
import { useEffect, useState } from 'react'
import { updateCurrentClick, updateParams } from '@/store/modules/drag.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'

const ClassName = () => {
  const prefixCls = getPrefixCls('edit-style-field')

  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const [classname, setClassName] = useState('')

  useEffect(() => {
    if (!currentClick || !currentClick.className) return
    setClassName(currentClick.className)
  }, [])
  const handleBlur = () => {
    if (!currentClick) return
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'className',
        params: classname
      })
    )
    dispatch(
      updateCurrentClick({
        key: 'className',
        params: classname
      })
    )
  }
  return (
    <div className={`${prefixCls}-class-name`}>
      <Input
        placeholder="请输入组件类名"
        onChange={(e) => setClassName(e.target.value)}
        onBlur={handleBlur}
        value={classname}
      />
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
