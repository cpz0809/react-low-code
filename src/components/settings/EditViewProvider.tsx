import Image from './image/Image.tsx'
import Main from './main/Main.tsx'
import {
  EditableTypeItem,
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import Modal from './modal/Modal.tsx'
import Title from './title/Title.tsx'
import { Props } from './util/type'
import Text from './text/Text.tsx'
import Button from './button/Button.tsx'

const componentMap: Record<string, React.ComponentType<Props>> = {
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
    const Component = componentMap[item.type]
    if (!Component) {
      return <div>Unknown PaneItemType: {item.type}</div>
    }
    return <Component type={type} data={item} />
  }
}
