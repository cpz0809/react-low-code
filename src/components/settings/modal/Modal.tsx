import ModalAttr from '@/components/settings/modal/ModalAttr.tsx'
import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { ModalAttrType } from './type.ts'

class Modal {
  static of(data: PaneItemType<ModalAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <ModalAttr data={data} />
      case 'event':
    }
  }
}

export default Modal
