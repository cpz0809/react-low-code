import { useRef, useState } from 'react'
import './style/index.scss'
import Drawer from '@/components/drawer/Drawer.tsx'
import { RootState } from '@/store'
import { setApiVisible } from '@/store/modules/view'
import { getPrefixCls } from '@/util/global-config'
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Switch
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FieldTypeKey } from './type'
import { isArray } from '@/util/is'
import { addApi, deleteApi, editApi } from '@/store/modules/api'
import { ApiSingleProps } from '@/store/types/api'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const defaultForm: ApiSingleProps = {
  name: '',
  type: 'get',
  url: '',
  params: null,
  autoSave: true
}

const ApiManage = () => {
  const prefix = getPrefixCls('api-manage')
  const dispatch = useDispatch()
  const { apiVisible } = useSelector((state: RootState) => state.viewSplice)
  const { apiData } = useSelector((state: RootState) => state.apiSlice)
  const paramsFormRef = useRef(null)

  const [form, setForm] = useState<ApiSingleProps>(defaultForm)

  const [visible, setVisible] = useState<boolean>(false)

  const changeForm = (key: FieldTypeKey, value: any) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const changeFormParams = (
    type: 'key' | 'value',
    value: any,
    index: number
  ) => {
    const temp = [...form.params]
    temp[index][type] = value
    changeForm('params', temp)
  }

  const renderParams = () =>
    form.params.map((_item: any, index: number) => (
      <Space key={index}>
        <Input
          value={form.params[index].key}
          style={{ width: 150 }}
          placeholder="请输入参数名"
          onChange={(e) => changeFormParams('key', e.target.value, index)}
        />
        <Input
          value={form.params[index].value}
          style={{ width: 200 }}
          placeholder="请输入参数值"
          onChange={(e) => changeFormParams('value', e.target.value, index)}
        />
      </Space>
    ))

  const handleClick = () => {
    setVisible(true)
  }

  const handleEditForm = (name: string) => {
    const data = apiData.find((item) => item.name === name)
    if (!data) return
    setForm(data)
    setVisible(true)
  }
  const handleOk = async () => {
    await (paramsFormRef.current as any)?.validateFields()
    const index = apiData.findIndex((item) => item.name === form.name)
    index !== -1
      ? dispatch(editApi({ index, params: form }))
      : dispatch(addApi(form))
    setVisible(false)
    resetForm()
  }
  const handleCancel = () => {
    setVisible(false)
    resetForm()
  }

  const resetForm = () => {
    setForm(defaultForm)
  }

  return (
    <>
      <Drawer
        show={apiVisible}
        title="页面接口"
        onclose={() => dispatch(setApiVisible())}
      >
        <div className={`${prefix}`}>
          <div className={`${prefix}-head`}>
            <Button type="primary" size="small" onClick={handleClick}>
              新增
            </Button>
          </div>
          <div className={`${prefix}-body`}>
            {apiData.map((item) => (
              <div className={`${prefix}-card`} key={item.name}>
                <div className={`${prefix}-card-head`}>
                  <div className={`${prefix}-card-head-left`}>{item.name}</div>
                  <div className={`${prefix}-card-head-right`}>
                    <Space>
                      <EditOutlined onClick={() => handleEditForm(item.name)} />
                      <DeleteOutlined
                        onClick={() => dispatch(deleteApi(item.name))}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
      <Modal
        title="接口配置"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={100001}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Form ref={paramsFormRef}>
          <Form.Item<ApiSingleProps>
            label="接口名称"
            name="name"
            rules={[{ required: true, message: '请输入接口名称' }]}
            initialValue={form.name}
          >
            <Input
              value={form.name}
              onChange={(e) => changeForm('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item<ApiSingleProps>
            label="接口类型"
            name="type"
            initialValue={form.type}
          >
            <Radio.Group
              buttonStyle="solid"
              value={form.type}
              onChange={(e: RadioChangeEvent) =>
                changeForm('type', e.target.value)
              }
            >
              <Radio.Button value="get">GET</Radio.Button>
              <Radio.Button value="post">POST</Radio.Button>
              <Radio.Button value="put">PUT</Radio.Button>
              <Radio.Button value="delete">DELETE</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item<ApiSingleProps>
            label="接口地址"
            name="url"
            rules={[{ required: true, message: '请输入接口地址' }]}
            initialValue={form.url}
          >
            <Input
              value={form.url}
              onChange={(e) => changeForm('url', e.target.value)}
            />
          </Form.Item>
          <Form.Item<ApiSingleProps>
            label="发送参数"
            name="params"
            initialValue={form.params}
          >
            <Space direction="vertical">
              {form.params && renderParams()}
              <Button
                onClick={() =>
                  isArray(form.params)
                    ? changeForm('params', [...form.params, {}])
                    : changeForm('params', [{}])
                }
              >
                添加
              </Button>
            </Space>
          </Form.Item>
          <Form.Item<ApiSingleProps>
            label="是否自动请求"
            name="autoSave"
            initialValue={form.autoSave}
          >
            <Switch
              value={form.autoSave}
              onChange={(checked: boolean) => changeForm('autoSave', checked)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ApiManage
