import {
  Image,
  Title,
  Text,
  Modal,
  Drawer,
  Tabs,
  Box,
  Button
} from '../../compt/index.ts'
import Main from '@/components/compt/main/Main.tsx'
import {
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const componentMap: Record<
  string,
  React.ComponentType<{ item: PaneItemType<any> }>
> = {
  [PaneItemTypes.Image]: Image,
  [PaneItemTypes.Title]: Title,
  [PaneItemTypes.Text]: Text,
  [PaneItemTypes.Main]: Main,
  [PaneItemTypes.Modal]: Modal,
  [PaneItemTypes.Drawer]: Drawer,
  [PaneItemTypes.Tabs]: Tabs,
  [PaneItemTypes.Box]: Box,
  [PaneItemTypes.Button]: Button
}

export class BaseDraggableViewProvider {
  static of(item: PaneItemType): React.ReactElement | null {
    const Component = componentMap[item.type]
    if (!Component) {
      return <div>Unknown PaneItemType: {item.type}</div>
    }
    return <Component item={item} />
  }
}
