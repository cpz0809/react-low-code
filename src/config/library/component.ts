import {
  CategoryEnum,
  PaneItemType,
  PaneItemTypes
} from '@/components/_types/util.ts'
import { HistoryEnum } from '@/store/_types/history'
import typeMapConfig from './typeMapConfig'

const defaultAttr = {
  style: {},
  uuid: '',
  children: [],
  parentUuid: null,
  operate: null,
  attr: {},
  hidden: 1,
  categoryType: CategoryEnum.default,
  loop: null,
  selectableEvent: ['onClick'],
  methods: {},
  className: null
}

export const MainConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Main,
  name: '页面',
  type: 'Main',
  style: {
    height: '100%'
  },
  operate: HistoryEnum.ADD,
  editableType: ['attr', 'style'],
  categoryType: CategoryEnum.container,
  selectableEvent: []
}

export const BoxConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Box,
  name: 'Box',
  type: PaneItemTypes.Box,
  categoryType: CategoryEnum.container
}

export const ButtonConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Button,
  name: '按钮',
  type: PaneItemTypes.Button,
  categoryType: CategoryEnum.default,
  attr: {
    type: 'primary',
    children: '按钮',
    size: 'default'
  }
}

export const ImageConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Image,
  name: '图片',
  type: PaneItemTypes.Image,
  attr: {
    src: 'https://img.alicdn.com/tps/TB16TQvOXXXXXbiaFXXXXXXXXXX-120-120.svg'
  }
}

export const TitleConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Title,
  name: '标题',
  type: PaneItemTypes.Title,
  attr: {
    children: '这是标题组件'
  },
  selectableEvent: ['onClick']
}

export const TextConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Text,
  name: '正文',
  type: PaneItemTypes.Text,
  attr: {
    children: '这是正文组件'
  }
}

export const ModalConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Modal,
  name: '高级对话框',
  type: PaneItemTypes.Modal,
  categoryType: CategoryEnum.container,
  attr: {
    title: '弹窗',
    open: true,
    mask: true
  },
  selectableEvent: ['onOk', 'onCancel', 'onClose']
}

export const DrawerConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Drawer,
  name: '高级抽屉',
  type: PaneItemTypes.Drawer,
  categoryType: CategoryEnum.container,
  attr: {
    title: '抽屉',
    open: true
  }
}

export const TabsConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Tabs,
  name: '选项卡',
  type: PaneItemTypes.Tabs,
  categoryType: CategoryEnum.container,
  attr: {
    labels: [
      { name: '标签项1', isClose: false, disable: false },
      { name: '标签项2', isClose: false, disable: false }
    ],
    activeKey: '0',
    type: 'line',
    size: 'middle',
    items: []
  }
}

export const FlexConfig: PaneItemType = {
  ...defaultAttr,
  ...typeMapConfig.Flex,
  name: '弹性布局',
  type: PaneItemTypes.Flex,
  categoryType: CategoryEnum.container,
  attr: {
    vertical: false
  }
}

const library = {
  MainConfig,
  BoxConfig,
  ButtonConfig,
  ImageConfig,
  TitleConfig,
  TextConfig,
  DrawerConfig,
  ModalConfig,
  TabsConfig,
  FlexConfig
}

export default library
