import {
  EditableTypeItem,
  PaneItemType
} from '@/components/_types/util.ts'
import ButtonAttr from './ButtonAttr'
import { ButtonAttrType } from './type.ts'

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
