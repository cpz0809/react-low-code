import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import { useAttrCollect } from '@/hooks/use-attr-collect'
import { Input, Switch } from 'antd'
import Row from '../util/row/Row'
import Group from '../util/group/Group'
import { buttonAttrSize, buttonAttrType } from './attr'
import { ButtonAttrType } from './type'
enum ButtonAttrEnum {
  Children = 'children',
  Type = 'type',
  Size = 'size',
  Loading = 'loading',
  Disabled = 'disabled'
}

const ButtonAttr = ({ data }: { data: PaneItemType<ButtonAttrType> }) => {
  const { collect } = useAttrCollect()
  const { children, loading, disabled } = data.attr

  return (
    <div className="edit-custom-attr-content">
      <Row title="按钮内容">
        <Input
          value={children}
          size="small"
          onChange={(e) => collect(ButtonAttrEnum.Children, e.target.value)}
        />
      </Row>
      <Row title="按钮类型">
        <Group
          data={buttonAttrType}
          onclick={(index) =>
            collect(ButtonAttrEnum.Type, buttonAttrType[index].style)
          }
        />
      </Row>
      <Row title="按钮尺寸">
        <Group
          data={buttonAttrSize}
          onclick={(index) =>
            collect(ButtonAttrEnum.Size, buttonAttrSize[index].style)
          }
        />
      </Row>
      <Row title="是否加载">
        <Switch
          onChange={(e) => collect(ButtonAttrEnum.Loading, e)}
          checked={loading}
        />
      </Row>
      <Row title="是否禁用">
        <Switch
          onChange={(e) => collect(ButtonAttrEnum.Disabled, e)}
          checked={disabled}
        />
      </Row>
    </div>
  )
}

export default ButtonAttr
