import MainIcon from '@/assets/svg/main.svg'
import {
  CategoryEnum,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { HistoryEnum } from '@/store/types/history'

export const mainCof: PaneItemType = {
  name: '页面',
  svg: MainIcon,
  type: 'Main',
  style: {
    height: '100%'
  },
  children: [],
  uuid: '',
  parentUuid: null,
  operate: HistoryEnum.ADD,
  index: 0,
  editableType: ['attr', 'style'],
  attr: {},
  hidden: false,
  categoryType: CategoryEnum.container
}
