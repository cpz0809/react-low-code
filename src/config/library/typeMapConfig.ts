import mainIcon from '@/assets/svg/main.svg'
import boxIcon from '@/assets/icon/box.png'
import buttonIcon from '@/assets/icon/button.png'
import imageIcon from '@/assets/svg/image.svg'
import TitleIcon from '@/assets/svg/title.svg'
import TextIcon from '@/assets/svg/text.svg'
import modalIcon from '@/assets/svg/modal.svg'
import tabsIcon from '@/assets/svg/tabs.svg'
import drawerIcon from '@/assets/svg/drawer.svg'
import { EditableTypeItem } from '@/components/_types/util.ts'

type typeMapConfigTypeKey =
  | 'Main'
  | 'Button'
  | 'Box'
  | 'Image'
  | 'Title'
  | 'Text'
  | 'Modal'
  | 'Drawer'
  | 'Tabs'

type typeMapConfigType = Record<
  typeMapConfigTypeKey,
  { svg: string; editableType: EditableTypeItem[] }
>

const typeMapConfig: typeMapConfigType = {
  Main: {
    svg: mainIcon,
    editableType: ['attr', 'style']
  },
  Box: {
    svg: boxIcon,
    editableType: ['attr', 'style', 'senior']
  },
  Button: {
    svg: buttonIcon,
    editableType: ['attr', 'style', 'senior']
  },
  Image: {
    svg: imageIcon,
    editableType: ['attr', 'style', 'senior']
  },
  Title: {
    svg: TitleIcon,
    editableType: ['attr', 'style', 'event', 'senior']
  },
  Text: {
    svg: TextIcon,
    editableType: ['attr', 'style', 'event', 'senior']
  },
  Modal: {
    svg: modalIcon,
    editableType: ['attr', 'style', 'event', 'senior']
  },
  Tabs: {
    svg: tabsIcon,
    editableType: ['attr', 'style', 'senior']
  },
  Drawer: {
    svg: drawerIcon,
    editableType: ['attr', 'style', 'senior']
  }
}

export default typeMapConfig
