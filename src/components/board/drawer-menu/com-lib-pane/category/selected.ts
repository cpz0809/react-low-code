import ImageSvg from '@/assets/svg/image.svg'
import TitleSvg from '@/assets/svg/title.svg'
import TextSvg from '@/assets/svg/text.svg'
import ModalSvg from '@/assets/svg/modal.svg'
import TabsSvg from '@/assets/svg/tabs.svg'
import DrawerSvg from '@/assets/svg/drawer.svg'
import { CategoryEnum, GroupPaneType, PaneItemTypes } from '../Type'

const defaultAttr = {
  style: {},
  uuid: '',
  children: [],
  parentUuid: null,
  operate: null,
  attr: {},
  hidden: false,
  categoryType: CategoryEnum.default
}

// 基础元素组件
const exquisite: GroupPaneType = {
  name: '基础元素',
  components: [
    {
      name: '图片',
      svg: ImageSvg,
      type: PaneItemTypes.Image,
      editableType: ['attr', 'style', 'senior'],
      ...defaultAttr
    },
    {
      name: '标题',
      svg: TitleSvg,
      type: PaneItemTypes.Title,
      editableType: ['attr', 'style', 'event', 'senior'],
      ...defaultAttr
    },
    {
      name: '正文',
      svg: TextSvg,
      type: PaneItemTypes.Text,
      editableType: ['attr', 'style', 'event', 'senior'],
      ...defaultAttr
    }
  ]
}
// 布局容器组件
const layoutContainer: GroupPaneType = {
  name: '布局容器类',
  components: [
    {
      name: '高级对话框',
      svg: ModalSvg,
      type: PaneItemTypes.Modal,
      editableType: ['attr', 'style', 'senior', 'event'],
      ...defaultAttr,
      attr: {
        title: '弹窗',
        open: true
      },
      categoryType: CategoryEnum.container
      // additional: {
      //   [PaneItemTypes.Button]: { ...buttonConfig }
      // }
    },
    {
      name: '高级抽屉',
      svg: DrawerSvg,
      type: PaneItemTypes.Drawer,
      editableType: ['attr', 'style', 'senior'],
      ...defaultAttr,
      categoryType: CategoryEnum.container,
      attr: {
        title: '抽屉',
        open: true
      }
    },
    {
      name: '选项卡',
      svg: TabsSvg,
      type: PaneItemTypes.Tabs,
      editableType: ['attr', 'style', 'senior'],
      ...defaultAttr,
      categoryType: CategoryEnum.container
    }
  ]
}

export default [exquisite, layoutContainer]
