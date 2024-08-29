import Row from '../util/row/Row'
import { useAttrCollect } from '@/hooks/use-attr-collect'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import { Switch, Input } from 'antd'
import { TextNodeAttrType } from './type'

const { TextArea } = Input

enum TextAttrEnum {
  Children = 'children',
  IsMark = 'isMark',
  IsCode = 'isCode',
  IsDel = 'isDel',
  IsU = 'isU',
  IsStrong = 'isStrong'
}

const TitleAttr = ({ data }: { data: PaneItemType<TextNodeAttrType> }) => {
  const { children, isMark, isCode, isDel, isU, isStrong } = data.attr
  const { collect } = useAttrCollect()
  return (
    <div className="edit-custom-attr-content">
      <Row title="文本内容">
        <TextArea
          value={children}
          onChange={(e) => collect(TextAttrEnum.Children, e.target.value)}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Row>
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
