import TitleAttr from './TitleAttr.tsx'
import { TextNodeAttrType } from '../text/type.ts'
import { EditableTypeItem, PaneItemType } from '@/components/_types/util.ts'

class Title {
  static of(data: PaneItemType<TextNodeAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <TitleAttr data={data} />
      case 'event':
    }
  }
}

export default Title
