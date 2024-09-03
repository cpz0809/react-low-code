import TitleAttr from './TitleAttr.tsx'
import { TextNodeAttrType } from '../text/type'
import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

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
