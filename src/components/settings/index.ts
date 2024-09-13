import { PaneItemTypes } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import Modal from './modal/Modal.tsx'
import Title from './title/Title.tsx'
import Text from './text/Text.tsx'
import Button from './button/Button.tsx'
import Image from './image/Image.tsx'
import Main from './main/Main.tsx'

export default {
  [PaneItemTypes.Image]: Image,
  [PaneItemTypes.Title]: Title,
  [PaneItemTypes.Main]: Main,
  [PaneItemTypes.Modal]: Modal,
  [PaneItemTypes.Text]: Text,
  [PaneItemTypes.Button]: Button
}
