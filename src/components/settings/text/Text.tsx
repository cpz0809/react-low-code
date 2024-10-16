import TextAttr from './TextAttr'
import { TextNodeAttrType } from './type.ts'
import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type'

class Text {
  static of(data: PaneItemType<TextNodeAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <TextAttr data={data} />
      case 'event':
    }
  }
}

export default Text
