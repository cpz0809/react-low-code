import { PaneItemType } from '@/components/board/_types/util.ts'
import { useAttrCollect } from '@/components/board/_hooks/use-attr-collect.ts'
import { Input, Switch } from 'antd'
import Group from '../_components/group/Group'
import { buttonAttrSize, buttonAttrType } from './attr'
import { ButtonAttrEnum, ButtonAttrType } from './type.ts'
import VariableBindingRow from '@/components/settings/_components/variable-binding-row/VariableBindingRow.tsx'

const ButtonAttr = ({ data }: { data: PaneItemType<ButtonAttrType> }) => {
  const { collect } = useAttrCollect()
  const { children, loading, disabled } = data.attr

  return (
    <div className="edit-custom-attr-content">
      <VariableBindingRow title="按钮内容" paramsKey={ButtonAttrEnum.Children}>
        <Input
          value={children}
          size="small"
          onChange={(e) => collect(ButtonAttrEnum.Children, e.target.value)}
        />
      </VariableBindingRow>
      <VariableBindingRow title="按钮内容" paramsKey={ButtonAttrEnum.Type}>
        <Group
          paramsKey={ButtonAttrEnum.Type}
          data={buttonAttrType}
          onclick={(index) =>
            collect(ButtonAttrEnum.Type, buttonAttrType[index].style)
          }
        />
      </VariableBindingRow>
      <VariableBindingRow title="按钮尺寸" paramsKey={ButtonAttrEnum.Size}>
        <Group
          paramsKey={ButtonAttrEnum.Size}
          data={buttonAttrSize}
          onclick={(index) =>
            collect(ButtonAttrEnum.Size, buttonAttrSize[index].style)
          }
        />
      </VariableBindingRow>
      <VariableBindingRow title="是否加载" paramsKey={ButtonAttrEnum.Loading}>
        <Switch
          onChange={(e) => collect(ButtonAttrEnum.Loading, e)}
          checked={loading}
        />
      </VariableBindingRow>
      <VariableBindingRow title="是否禁用" paramsKey={ButtonAttrEnum.Disabled}>
        <Switch
          onChange={(e) => collect(ButtonAttrEnum.Disabled, e)}
          checked={disabled}
        />
      </VariableBindingRow>
    </div>
  )
}

export default ButtonAttr
