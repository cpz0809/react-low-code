import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type'
import ButtonAttr from './ButtonAttr'
import { ButtonAttrType } from './type'

class Button {
  static of(data: PaneItemType<ButtonAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <ButtonAttr data={data} />
      case 'event':
    }
  }
}

export default Button
