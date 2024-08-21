import { CategoryEnum, GroupPaneType, PaneItemTypes } from '../Type'
import boxIcon from '@/assets/icon/box.png'

const defaultAttr = {
  style: {},
  uuid: '',
  children: [],
  parentUuid: null,
  operate: null,
  index: 0,
  attr: {},
  hidden: false,
  categoryType: CategoryEnum.default
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

export default [layoutContainer]
