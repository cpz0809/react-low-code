import './style/index.scss'
import Drawer from '@/components/board/drawer-menu/_components/drawer/Drawer'
import { RootState } from '@/store'
import { setVariableVisible } from '@/store/modules/view'
import { StateSingleProps } from '@/store/types/state'
import { getPrefixCls } from '@/util/global-config'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
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
import { deleteState, addOrEditState } from '@/store/modules/state'

const defaultParams: StateSingleProps = {
  code: null,
  name: '',
  type: 'string',
  value: null,
  illustrate: ''
}
const VariableManage = () => {
  const prefix = getPrefixCls('variable-manage')
  const dispatch = useDispatch()
  const { variableVisible } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const { stateData } = useSelector((state: RootState) => state.stateSplice)
  const [messageApi, contextHolder] = message.useMessage()
  const paramsFormRef = useRef(null)
  const [visible, setVisible] = useState<boolean>(false)

  const [form, setForm] = useState<StateSingleProps>(defaultParams)

  const handleClick = () => {
    setVisible(true)
  }
  const handleEditForm = (name: string) => {
    const data = stateData.find((item) => item.name === name)
    if (!data) return
    setForm(data)
    setVisible(true)
  }
  const handleOk = async () => {
    await (paramsFormRef.current as any)?.validateFields()
    dispatch(addOrEditState(form))
    messageApi.success('添加成功')
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

  const renderDefault = () =>
    form.type === 'string' ? (
      <Input
        placeholder="请输入变量默认值"
        value={form.value}
        onChange={(e) => changeForm('value', e.target.value)}
      />
    ) : form.type === 'number' ? (
      <InputNumber
        style={{ width: '100%' }}
        placeholder="请输入变量默认值"
        onChange={(e) => changeForm('value', e)}
      />
    ) : form.type === 'boolean' ? (
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
        title="页面接口"
        onclose={() => dispatch(setVariableVisible())}
      >
        <div className={`${prefix}`}>
          <div className={`${prefix}-head`}>
            <Button type="primary" size="small" onClick={handleClick}>
              新增
            </Button>
          </div>
          <div className={`${prefix}-body`}>
            {stateData.map((item) => (
              <div className={`${prefix}-card`} key={item.name}>
                <div className={`${prefix}-card-head`}>
                  <div className={`${prefix}-card-head-left`}>{item.name}</div>
                  <div className={`${prefix}-card-head-right`}>
                    <Space>
                      <EditOutlined onClick={() => handleEditForm(item.name)} />
                      <DeleteOutlined
                        onClick={() => dispatch(deleteState(item.name))}
                      />
                    </Space>
                  </div>
                </div>
                <div className={`${prefix}-card-body`}>
                  <Button
                    size="small"
                    type="primary"
                    style={{ backgroundColor: '#ebecf0', color: '#666' }}
                  >
                    {item.type.toUpperCase()}
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
          <Form.Item<StateSingleProps>
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
          <Form.Item<StateSingleProps>
            label="变量类型"
            name="type"
            initialValue={form.type}
            rules={[{ required: true, message: '请选择变量类型' }]}
          >
            <Radio.Group
              buttonStyle="solid"
              value={form.type}
              onChange={(e: RadioChangeEvent) =>
                changeForm('type', e.target.value)
              }
            >
              <Radio.Button value="string">字符串</Radio.Button>
              <Radio.Button value="number">数字</Radio.Button>
              <Radio.Button value="boolean">布尔</Radio.Button>
              <Radio.Button value="array">数组</Radio.Button>
              <Radio.Button value="object">对象</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item<StateSingleProps>
            label="变量默认值"
            name="value"
            rules={[{ required: true, message: '请输入变量默认值' }]}
            initialValue={form.value}
          >
            {renderDefault()}
          </Form.Item>
          <Form.Item<StateSingleProps>
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
      {contextHolder}
    </>
  )
}

export default VariableManage
