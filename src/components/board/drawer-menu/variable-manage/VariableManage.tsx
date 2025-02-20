import './style/index.scss'
import Drawer from '@/components/board/drawer-menu/_components/drawer/Drawer'
import { RootState } from '@/store'
import { setMenuVisible } from '@/store/modules/view'
import { getPrefixCls } from '@/util/global-config'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Space,
  Switch
} from 'antd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormKey } from './type'
import MonacoEditor from '@monaco-editor/react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { VariableSingleProps } from '@/store/_types/context'
import { isObject } from '@/util/is.ts'

const defaultParams: VariableSingleProps = {
  code: '',
  name: '',
  type: 'String',
  value: null,
  illustrate: ''
}
const VariableManage = ({
  onSubmit,
  onRemove
}: {
  onSubmit: (form: VariableSingleProps) => Promise<boolean>
  onRemove: (codes: string[]) => Promise<boolean>
}) => {
  const prefix = getPrefixCls('variable-manage')
  const dispatch = useDispatch()
  const { variableVisible } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const { stateData } = useSelector((state: RootState) => state.contextSlice)
  const paramsFormRef = useRef(null)
  const [visible, setVisible] = useState<boolean>(false)

  const [form, setForm] = useState<VariableSingleProps>(defaultParams)

  const handleClick = () => {
    setVisible(true)
  }

  const typeConversion = (value: any) => {
    if (isObject(value || Array.isArray(value))) JSON.stringify(value)
    if (typeof value === 'string' && !value) return ''
    return value
  }

  const handleEditForm = (item: VariableSingleProps) => {
    if (!stateData) return
    setForm({
      ...item,
      value: typeConversion(item.value)
    })
    setVisible(true)
  }

  const handleOk = async () => {
    await (paramsFormRef.current as any)?.validateFields()
    const res = onSubmit({
      ...form,
      value:
        typeof form.value === 'object' ? JSON.parse(form.value) : form.value
    })
    if (!res) return
    // dispatch(
    //   addOrEditVariable({
    //     type: 'state',
    //     data: {
    //       ...form,
    //       value: form.type !== 'string' ? JSON.parse(form.value) : form.value
    //     }
    //   })
    // )
    setVisible(false)
    resetForm()
  }
  const handleCancel = () => {
    setVisible(false)
    resetForm()
  }
  const resetForm = () => {
    setForm(defaultParams)
  }
  const changeForm = (key: FormKey, value: any) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const setDefaultFormValue = (type: any, key: FormKey) => {
    let value
    switch (type) {
      case 'string':
        value = ''
        break
      case 'number':
        value = null
        break
      case 'boolean':
        value = false
        break
      case 'array':
        value = '[]'
        break
      case 'object':
        value = '{}'
        break
    }
    setForm({ ...form, value, [key]: type })
  }

  const renderDefault = () =>
    form.type === 'String' ? (
      <Input
        placeholder="请输入变量默认值"
        value={form.value}
        onChange={(e) => changeForm('value', e.target.value)}
      />
    ) : form.type === 'Number' ? (
      <InputNumber
        style={{ width: '100%' }}
        placeholder="请输入变量默认值"
        onChange={(e) => changeForm('value', e)}
      />
    ) : form.type === 'Boolean' ? (
      <Switch onChange={(e) => changeForm('value', e)} />
    ) : (
      <div style={{ height: 100 }}>
        <MonacoEditor
          width="100%"
          height="100%"
          language="javascript"
          value={form.value}
          onChange={(e) => changeForm('value', e)}
        />
      </div>
    )
  return (
    <>
      <Drawer
        show={variableVisible}
        title="页面变量"
        onclose={() => dispatch(setMenuVisible('variableVisible'))}
      >
        <div className={`${prefix}`}>
          <div className={`${prefix}-head`}>
            <Button type="primary" size="small" onClick={handleClick}>
              新增
            </Button>
          </div>
          <div className={`${prefix}-body`}>
            {stateData.map((item) => (
              <div className={`${prefix}-card`} key={item.code}>
                <div className={`${prefix}-card-head`}>
                  <div className={`${prefix}-card-head-left`}>{item.name}</div>
                  <div className={`${prefix}-card-head-right`}>
                    <Space>
                      <EditOutlined onClick={() => handleEditForm(item)} />
                      <Popconfirm
                        zIndex={10001}
                        title="确认删除"
                        description="是否删除当前变量?"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => onRemove([item.code])}
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </Space>
                  </div>
                </div>
                <div className={`${prefix}-card-body`}>
                  <Button
                    size="small"
                    type="primary"
                    style={{ backgroundColor: '#ebecf0', color: '#666' }}
                  >
                    {item.type}
                  </Button>
                  <p className={`${prefix}-card-text`}>{item.illustrate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
      <Modal
        title="变量配置"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={100001}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Form ref={paramsFormRef}>
          <Form.Item<VariableSingleProps>
            label="变量名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入正确的变量名称',
                pattern: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
              }
            ]}
            initialValue={form.name}
          >
            <Input
              placeholder="请输入变量名称"
              value={form.name}
              onChange={(e) => changeForm('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item<VariableSingleProps>
            label="变量类型"
            name="type"
            initialValue={form.type}
            rules={[{ required: true, message: '请选择变量类型' }]}
          >
            <Radio.Group
              buttonStyle="solid"
              value={form.type}
              onChange={(e: RadioChangeEvent) =>
                setDefaultFormValue(e.target.value, 'type')
              }
            >
              <Radio.Button value="String">字符串</Radio.Button>
              <Radio.Button value="Number">数字</Radio.Button>
              <Radio.Button value="Boolean">布尔</Radio.Button>
              <Radio.Button value="Array">数组</Radio.Button>
              <Radio.Button value="Object">对象</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item<VariableSingleProps>
            label="变量默认值"
            name="value"
            initialValue={form.value}
          >
            {renderDefault()}
          </Form.Item>
          <Form.Item<VariableSingleProps>
            label="变量说明"
            name="illustrate"
            initialValue={form.illustrate}
          >
            <Input
              placeholder="请输入变量说明"
              value={form.illustrate}
              onChange={(e) => changeForm('illustrate', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default VariableManage
