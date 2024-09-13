import { PaneItemTypes } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { Modal } from 'antd'

export default {
  [PaneItemTypes.Main]: <div></div>,
  [PaneItemTypes.Image]: <img />,
  [PaneItemTypes.Title]: <p></p>,
  [PaneItemTypes.Text]: <span></span>,
  [PaneItemTypes.Modal]: <Modal />
}
