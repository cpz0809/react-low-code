import {
  Image,
  Title,
  Text,
  Modal,
  Drawer,
  Tabs,
  Box
} from '../../compt/index.ts'
import Main from '@/components/compt/main/Main.tsx'
import {
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

export class BaseDraggableViewProvider {
  static of(item: PaneItemType) {
    switch (item.type) {
      case PaneItemTypes.Image:
        return <Image item={item} />
      case PaneItemTypes.Title:
        return <Title item={item} />
      case PaneItemTypes.Text:
        return <Text item={item} />
      case PaneItemTypes.Main:
        return <Main item={item} />
      case PaneItemTypes.Modal:
        return <Modal item={item} />
      case PaneItemTypes.Drawer:
        return <Drawer item={item} />
      case PaneItemTypes.Tabs:
        return <Tabs item={item} />
      case PaneItemTypes.Box:
        return <Box item={item} />
      default:
        return <div>{item.type}</div>
    }
  }
}
