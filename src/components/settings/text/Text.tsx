import TextAttr from './TextAttr'
import { TextNodeAttrType } from './type.ts'
import { EditableTypeItem, PaneItemType } from '@/components/_types/util.ts'

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
