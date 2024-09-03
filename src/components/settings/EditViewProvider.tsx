import Image from './image/Image.tsx'
import Main from './main/Main.tsx'
import {
  EditableTypeItem,
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import Modal from './modal/Modal.tsx'
import Title from './title/Title.tsx'
import Text from './text/Text.tsx'
import Button from './button/Button.tsx'
import Style from './_components/style/Style.tsx'
import Senior from './_components/senior/Senior.tsx'

const componentMap: { [key: string]: any } = {
  [PaneItemTypes.Image]: Image,
  [PaneItemTypes.Title]: Title,
  [PaneItemTypes.Main]: Main,
  [PaneItemTypes.Modal]: Modal,
  [PaneItemTypes.Text]: Text,
  [PaneItemTypes.Button]: Button
}

export class EditViewProvider {
  static of(
    item: PaneItemType,
    type: EditableTypeItem
  ): React.ReactElement | null {
    if (type === 'style') return <Style />
    if (type === 'senior') return <Senior />
    const Component = componentMap[item.type]
    return Component.of(item, type)
  }
}
