import Row from '../_components/row/Row'
import { useAttrCollect } from '@/components/_hooks/use-attr-collect.ts'
import { PaneItemType } from '@/components/_types/util.ts'
import { Switch, Input } from 'antd'
import { TextAttrEnum, TextNodeAttrType } from './type.ts'
import VariableBindingRow from '../_components/variable-binding-row/VariableBindingRow'

const { TextArea } = Input

const TitleAttr = ({ data }: { data: PaneItemType<TextNodeAttrType> }) => {
  const { children, isMark, isCode, isDel, isU, isStrong } = data.attr
  const { collect } = useAttrCollect()
  return (
    <div className="edit-custom-attr-content">
      <VariableBindingRow title="文本内容" paramsKey={TextAttrEnum.Children}>
        <TextArea
          value={children}
          onChange={(e) => collect(TextAttrEnum.Children, e.target.value)}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </VariableBindingRow>
      <Row title="标记">
        <Switch
          onChange={(e) => collect(TextAttrEnum.IsMark, e)}
          checked={isMark}
        />
      </Row>
      <Row title="代码">
        <Switch
          onChange={(e) => collect(TextAttrEnum.IsCode, e)}
          checked={isCode}
        />
      </Row>
      <Row title="删除线">
        <Switch
          onChange={(e) => collect(TextAttrEnum.IsDel, e)}
          checked={isDel}
        />
      </Row>
      <Row title="下划线">
        <Switch onChange={(e) => collect(TextAttrEnum.IsU, e)} checked={isU} />
      </Row>
      <Row title="是否加粗">
        <Switch
          onChange={(e) => collect(TextAttrEnum.IsStrong, e)}
          checked={isStrong}
        />
      </Row>
    </div>
  )
}

export default TitleAttr
