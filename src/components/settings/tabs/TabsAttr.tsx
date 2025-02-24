import { PaneItemType } from '@/components/_types/util.ts'
import {
  LabelsType,
  TabsAttrEnum,
  TabsAttrType
} from '@/components/settings/tabs/type.ts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useAttrCollect } from '@/components/_hooks/use-attr-collect.ts'
import './style/tabsAttr.scss'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentClick, updateParams } from '@/store/modules/drag.ts'
import { RootState } from '@/store'
import Group from '@/components/settings/_components/group/Group.tsx'
import {
  tabsAttrSizeGroup,
  tabsAttrTypeGroup
} from '@/components/settings/tabs/attr.ts'
import VariableBindingRow from '@/components/settings/_components/variable-binding-row/VariableBindingRow.tsx'

const TabsAttr = ({ data }: { data: PaneItemType<TabsAttrType> }) => {
  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const { collect } = useAttrCollect()
  const { labels } = data.attr

  const handleChangeLabelName = (value: string, index: number) => {
    const temp = labels.map((item) => item)
    temp[index] = { ...temp[index], name: value }
    changeParams({ labels: temp })
  }
  const handleAddLabel = () => {
    const temp: LabelsType = {
      name: `标签项${labels.length + 1}`,
      isClose: false,
      disable: false
    }
    const arr = [...labels]
    arr.push(temp)
    changeParams({ labels: arr })
  }
  const handleLabelDel = (index: number) => {
    const temp = [...labels]
    temp.splice(index, 1)
    changeParams({ labels: temp })
  }
  const changeParams = (params: any) => {
    if (!currentClick) return
    dispatch(
      updateCurrentClick({
        key: 'attr',
        params: {
          ...data.attr,
          ...params
        }
      })
    )
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'attr',
        params: {
          ...data.attr,
          ...params
        }
      })
    )
  }
  return (
    <div className="edit-custom-attr-content">
      {/*  标签项编辑  */}
      <div className="tabs-attr-label-row">
        <div className="tabs-attr-label-items">
          {labels.map((item, index) => (
            <div className="tabs-attr-label-item" key={index}>
              <Button icon={<EditOutlined />} style={{ border: 'none' }} />
              <Input
                className="tabs-attr-label-input"
                value={item.name}
                size="small"
                onChange={(e) => handleChangeLabelName(e.target.value, index)}
              />
              <Button
                icon={<DeleteOutlined />}
                style={{ border: 'none' }}
                onClick={() => handleLabelDel(index)}
              />
            </div>
          ))}
        </div>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          size="small"
          onClick={handleAddLabel}
        >
          添加一项
        </Button>
      </div>
      <VariableBindingRow title="形态" paramsKey={TabsAttrEnum.Type}>
        <Group
          paramsKey={TabsAttrEnum.Type}
          data={tabsAttrTypeGroup}
          onclick={(index) =>
            collect(TabsAttrEnum.Type, tabsAttrTypeGroup[index].style)
          }
        />
      </VariableBindingRow>
      <VariableBindingRow title="尺寸" paramsKey={TabsAttrEnum.Size}>
        <Group data={tabsAttrSizeGroup} paramsKey={TabsAttrEnum.Size} />
      </VariableBindingRow>
    </div>
  )
}

export default TabsAttr
