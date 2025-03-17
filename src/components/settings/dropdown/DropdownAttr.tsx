import { PaneItemType } from '@/components/board/_types/util.ts'
import { useAttrCollect } from '@/components/board/_hooks/use-attr-collect.ts'
import { DropdownAttrEnum, DropdownAttrType } from './type.ts'
import VariableBindingRow from '@/components/settings/_components/variable-binding-row/VariableBindingRow.tsx'
import { Button, Form, Input, Modal, Space, Switch } from 'antd'
import Group from '@/components/settings/_components/group/Group.tsx'
import {
  placementOptions,
  triggerOptions
} from '@/components/settings/dropdown/config.ts'
import EditCollapse from '@/components/settings/_components/edit-collapse/EditCollapse.tsx'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentClick, updateParams } from '@/store/modules/drag.ts'
import { RootState } from '@/store'

interface OptionItem {
  key: string
  label: string
  index?: number
}

const ButtonAttr = ({ data }: { data: PaneItemType<DropdownAttrType> }) => {
  const dispatch = useDispatch()
  const { collect } = useAttrCollect()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)

  const [visible, setVisible] = useState<boolean>(false)
  const { arrow, disabled, menu } = data.attr
  const [form, setForm] = useState<OptionItem>({
    key: '',
    label: ''
  })

  const handleAddOrEditMenuItem = (item?: OptionItem, index?: number) => {
    if (item) {
      setForm({ ...item, index })
    }
    setVisible(true)
  }

  const handleOk = () => {
    if (!currentClick || !data.attr.menu.items) return
    const items = [...data.attr.menu.items]
    if (form.index?.toString()) {
      items[form.index] = form
    } else {
      items.push(form)
    }
    const params = {
      ...data.attr,
      menu: {
        ...data.attr.menu,
        items
      }
    }
    dispatch(
      updateCurrentClick({
        key: 'attr',
        params
      })
    )
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'attr',
        params
      })
    )

    cancel()
  }
  const cancel = () => {
    setForm({
      key: '',
      label: ''
    })
    setVisible(false)
  }
  return (
    <div className="edit-custom-attr-content">
      <VariableBindingRow title="下拉箭头" paramsKey={DropdownAttrEnum.ARROW}>
        <Switch
          value={arrow}
          onChange={(e) => collect(DropdownAttrEnum.ARROW, e)}
        />
      </VariableBindingRow>

      <VariableBindingRow
        title="是否禁用"
        paramsKey={DropdownAttrEnum.DISABLED}
      >
        <Switch
          value={disabled}
          onChange={(e) => collect(DropdownAttrEnum.DISABLED, e)}
        />
      </VariableBindingRow>

      <VariableBindingRow
        title="弹出位置"
        paramsKey={DropdownAttrEnum.PLACEMENT}
      >
        <Group
          paramsKey={DropdownAttrEnum.PLACEMENT}
          data={placementOptions}
          onclick={(index) =>
            collect(DropdownAttrEnum.PLACEMENT, placementOptions[index].style)
          }
        />
      </VariableBindingRow>

      <VariableBindingRow title="触发方式" paramsKey={DropdownAttrEnum.TRIGGER}>
        <Group
          paramsKey={DropdownAttrEnum.TRIGGER}
          data={triggerOptions}
          onclick={(index) =>
            collect(DropdownAttrEnum.TRIGGER, triggerOptions[index].style)
          }
        />
      </VariableBindingRow>

      <EditCollapse title="选项" isCollapse={true} isConfig={false}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            {(menu.items as any).map((item: any, index: number) => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space>
                  <p>
                    {item.key}: {item.label}
                  </p>
                </Space>
                <Button
                  type="link"
                  onClick={() => handleAddOrEditMenuItem(item, index)}
                >
                  <EditOutlined />
                </Button>
              </div>
            ))}
          </div>
          <Button type="link" onClick={() => handleAddOrEditMenuItem()}>
            添加一项＋
          </Button>
        </Space>
      </EditCollapse>

      <Modal
        title={form.index ? '修改选项' : '新增选项'}
        open={visible}
        onOk={handleOk}
        onCancel={cancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Form initialValues={form}>
          <Form.Item label="key" name="key">
            <Input
              placeholder="请输入key"
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="label" name="label">
            <Input
              placeholder="请输入label"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ButtonAttr
