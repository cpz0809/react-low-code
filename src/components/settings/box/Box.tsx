import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import BoxAttr from '@/components/settings/box/BoxAttr.tsx'
import { ButtonAttrType } from '@/components/settings/button/type'

class Box {
  static of(data: PaneItemType<ButtonAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <BoxAttr data={data} />
    }
  }
}

export default Box
