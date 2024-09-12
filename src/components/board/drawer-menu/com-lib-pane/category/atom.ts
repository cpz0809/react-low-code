import {
  CategoryEnum,
  GroupPaneType,
  PaneItemType,
  PaneItemTypes
} from '../Type'
import boxIcon from '@/assets/icon/box.png'
import buttonIcon from '@/assets/icon/button.png'

const defaultAttr = {
  style: {},
  uuid: '',
  children: [],
  parentUuid: null,
  operate: null,
  attr: {},
  hidden: false,
  categoryType: CategoryEnum.default,
  loop: null,
  selectableEvent: ['onClick'],
  methods: {}
}

// 布局容器类
const layoutContainer: GroupPaneType = {
  name: '布局容器类',
  components: [
    {
      name: 'Box',
      svg: boxIcon,
      type: PaneItemTypes.Box,
      editableType: ['attr', 'style', 'senior'],
      ...defaultAttr,
      categoryType: CategoryEnum.container
    }
  ]
}

export const buttonConfig: PaneItemType = {
  name: '按钮',
  svg: buttonIcon,
  type: PaneItemTypes.Button,
  editableType: ['attr', 'style', 'senior'],
  ...defaultAttr,
  categoryType: CategoryEnum.default,
  attr: {
    type: 'primary',
    children: '按钮'
  }
}

const generalContainer: GroupPaneType = {
  name: '通用',
  components: [buttonConfig]
}

export default [layoutContainer, generalContainer]
