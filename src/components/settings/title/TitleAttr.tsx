import TextArea from 'antd/es/input/TextArea'
import Row from '../_components/row/Row'
import { useAttrCollect } from '@/hooks/use-attr-collect'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import { Switch } from 'antd'
import { TextNodeAttrType } from '../text/type'

enum TitleAttrEnum {
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
          onChange={(e) => collect(TitleAttrEnum.Children, e.target.value)}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Row>
      <Row title="标记">
        <Switch
          onChange={(e) => collect(TitleAttrEnum.IsMark, e)}
          checked={isMark}
        />
      </Row>
      <Row title="代码">
        <Switch
          onChange={(e) => collect(TitleAttrEnum.IsCode, e)}
          checked={isCode}
        />
      </Row>
      <Row title="删除线">
        <Switch
          onChange={(e) => collect(TitleAttrEnum.IsDel, e)}
          checked={isDel}
        />
      </Row>
      <Row title="下划线">
        <Switch onChange={(e) => collect(TitleAttrEnum.IsU, e)} checked={isU} />
      </Row>
      <Row title="是否加粗">
        <Switch
          onChange={(e) => collect(TitleAttrEnum.IsStrong, e)}
          checked={isStrong}
        />
      </Row>
    </div>
  )
}

export default TitleAttr
