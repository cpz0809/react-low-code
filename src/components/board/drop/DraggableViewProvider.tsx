import {
  Image,
  Title,
  Text,
  Modal,
  Drawer,
  Tabs,
  Box,
  Button,
  Flex
} from '../../compt/index.ts'
import Main from '@/components/compt/main/Main.tsx'
import { PaneItemType, PaneItemTypes } from '@/components/_types/util.ts'
import { ComponentType, ReactElement } from 'react'

const componentMap: Record<
  string,
  ComponentType<{ item: PaneItemType<any> }>
> = {
  [PaneItemTypes.Image]: Image,
  [PaneItemTypes.Title]: Title,
  [PaneItemTypes.Text]: Text,
  [PaneItemTypes.Main]: Main,
  [PaneItemTypes.Modal]: Modal,
  [PaneItemTypes.Drawer]: Drawer,
  [PaneItemTypes.Tabs]: Tabs,
  [PaneItemTypes.Box]: Box,
  [PaneItemTypes.Button]: Button,
  [PaneItemTypes.Flex]: Flex
}

export class BaseDraggableViewProvider {
  static of(item: PaneItemType): ReactElement | null {
    const Component = componentMap[item.type]
    if (!Component) {
      return <div>Unknown PaneItemType: {item.type}</div>
    }
    return <Component item={item} />
  }
}
