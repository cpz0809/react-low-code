import { useState } from 'react'
import { getPrefixCls } from '@/util/global-config'
import './style/index.scss'
import EditCollapse from '../edit-collapse/EditCollapse'
import { EventProps, TableDataType } from './type'
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
  Switch,
  Table,
  TableProps
} from 'antd'
import {
  DeleteOutlined,
  PaperClipOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import MonacoEditor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { updateCurrentClick, updateParams } from '@/store/modules/drag'

loader.config({ monaco })

const Event = ({ data }: EventProps) => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('event')
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const { methods } = useSelector((state: RootState) => state.contextSlice)
  const [visible, setVisible] = useState(false)
  const [openExtend, setOpenExtend] = useState(false)
  const [currentEvent, setCurrentEvent] = useState('')
  const [currentMethod, setCurrentMethod] = useState('')
  const [editorValue, setEditorValue] = useState('')

  const renderItems = (): MenuProps['items'] =>
    data.selectableEvent.map((item) => ({
      key: item,
      disabled: !!data.methods[item],
      label: <div className={`${prefix}-menu-item`}>{item}</div>
    }))

  const items: MenuProps['items'] = renderItems()

  const columns: TableProps<TableDataType>['columns'] = [
    {
      width: 220,
      title: '已有事件',
      key: 'event',
      render: (_, record) => (
        <div className={`${prefix}-cell`}>
          <div className={`${prefix}-cell-head`}>
            <div className={`${prefix}-cell-tab`}>组</div>
            <div className={`${prefix}-cell-event-name`}>
              {record.eventName}
            </div>
          </div>
          <div className={`${prefix}-cell-body`}>
            <PaperClipOutlined />
            <a className={`${prefix}-cell-method-name`}>{record.methodName}</a>
          </div>
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <SettingOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => handleEditEvent(record)}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteEvent(record)}
          />
        </Space>
      )
    }
  ]
  const dataSource: TableDataType[] = Object.entries(data.methods).map(
    ([eventName, methodName]) => ({ methodName, eventName })
  )

  const handleEditEvent = (data: TableDataType) => {
    setCurrentEvent(data.eventName)
    setCurrentMethod(data.methodName)
    setVisible(true)
  }
  const handleDeleteEvent = (row: TableDataType) => {
    if (!currentClick) return
    const params = { ...data.methods }
    delete params[row.eventName]
    changeMethod(params, currentClick.uuid)
  }
  const handleDropdownClick = (e: any) => {
    setCurrentEvent(e.key)
    setVisible(true)
  }
  const handleSelectEvent = (event: string) => {
    setCurrentMethod(event)
  }
  const handleEditorChange = (e: string | undefined) => {
    if (!e) return
    setEditorValue(e)
  }
  const handleOk = () => {
    if (!currentClick) return
    const params = {
      ...data.methods,
      [currentEvent]: currentMethod
    }
    changeMethod(params, currentClick.uuid)
    reset()
  }
  const changeMethod = (params: any, uuid: string) => {
    if (!currentClick) return
    dispatch(
      updateParams({
        uuid,
        key: 'methods',
        params
      })
    )
    dispatch(
      updateCurrentClick({
        key: 'methods',
        params
      })
    )
  }
  const reset = () => {
    setCurrentEvent('')
    setCurrentMethod('')
    setVisible(false)
  }

  return (
    <>
      <EditCollapse title="事件设置" isConfig={false}>
        <div className={`${prefix}-container`}>
          <div className={`${prefix}-head`}>
            <p className={`${prefix}-tips`}>点击绑定事件</p>
            <Dropdown
              menu={{ items, onClick: handleDropdownClick }}
              trigger={['click']}
            >
              <Button block={true}>组件自带事件</Button>
            </Dropdown>
          </div>
          <div className={`${prefix}-body`}>
            <Table
              locale={{
                emptyText: '没有数据'
              }}
              columns={columns}
              dataSource={dataSource}
              bordered={true}
              className={`${prefix}-table`}
            />
          </div>
        </div>
      </EditCollapse>
      <Modal
        width={850}
        open={visible}
        title="事件绑定"
        okText="确认"
        cancelText="取消"
        onOk={handleOk}
        onCancel={reset}
        zIndex={10001}
      >
        <div className={`${prefix}-event-binding`}>
          <div className={`${prefix}-left`}>
            <p className={`${prefix}-tips`}>事件选择</p>
            <div className={`${prefix}-content`}>
              {Object.keys(methods).map((item) => (
                <div
                  onClick={() => handleSelectEvent(item)}
                  className={`${prefix}-name ${currentMethod === item ? `${prefix}-name-active` : ''}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={`${prefix}-right`}>
            <p className={`${prefix}-tips`}>事件名称</p>
            <Input value={currentMethod} disabled={true} />
            <div className={`${prefix}-extend`}>
              <div className={`${prefix}-extend-switch`}>
                <Space align="center">
                  <p className={`${prefix}-tips`}>扩展参数设置</p>
                  <Switch
                    onChange={(e) => setOpenExtend(e)}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    value={openExtend}
                  />
                </Space>
              </div>
              <div className={`${prefix}-editor`}>
                {!openExtend && <div className={`${prefix}-editor-mask`} />}
                <MonacoEditor
                  value={editorValue}
                  width={'100%'}
                  height={'100%'}
                  theme="vs"
                  language="javascript"
                  options={{
                    tabSize: 2,
                    minimap: {
                      enabled: false
                    }
                  }}
                  onChange={(e) => handleEditorChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Event
