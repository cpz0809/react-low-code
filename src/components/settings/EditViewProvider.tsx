import Image from './image/Image.tsx'
import Main from './main/Main.tsx'
import {
  EditableTypeItem,
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import Modal from '@/components/settings/modal/Modal.tsx'

export class EditViewProvider {
  static of(item: PaneItemType, type: EditableTypeItem) {
    switch (item.type) {
      case PaneItemTypes.Image:
        return <Image type={type} />
      case PaneItemTypes.Main:
        return <Main type={type} />
      case PaneItemTypes.Modal:
        return <Modal type={type} />
      default:
        return
    }
  }
}
