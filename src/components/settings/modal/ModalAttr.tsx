import VariableBindingRow from '@/components/settings/_components/variable-binding-row/VariableBindingRow.tsx'
import { ModalAttrEnum, ModalAttrType } from './type.ts'
import { Input, Switch } from 'antd'
import { useAttrCollect } from '@/components/board/_hooks/use-attr-collect.ts'
import { PaneItemType } from '@/components/board/_types/util.ts'

const ModalAttr = ({ data }: { data: PaneItemType<ModalAttrType> }) => {
  const { collect, mapValue } = useAttrCollect()
  const { title, mask, open } = mapValue(data.attr)
  return (
    <div className="edit-custom-attr-content">
      <VariableBindingRow title="是否显示" paramsKey={ModalAttrEnum.OPEN}>
        <Switch
          value={open}
          onChange={(e) => collect(ModalAttrEnum.OPEN, e, true)}
        />
      </VariableBindingRow>
      <VariableBindingRow title="标题" paramsKey={ModalAttrEnum.TITLE}>
        <Input
          value={title}
          onChange={(e) => collect(ModalAttrEnum.TITLE, e.target.value)}
        />
      </VariableBindingRow>
      <VariableBindingRow title="显示遮罩" paramsKey={ModalAttrEnum.MASK}>
        <Switch value={mask} onChange={(e) => collect(ModalAttrEnum.MASK, e)} />
      </VariableBindingRow>
    </div>
  )
}

export default ModalAttr
