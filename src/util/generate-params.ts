import { v4 as uuid } from 'uuid'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

export const generateParams = (data: PaneItemType) => {
  return {
    ...data,
    uuid: uuid()
  }
}
