import { GroupPaneType } from '@/components/board/_types/util.ts'
import { BoxConfig, ButtonConfig, DropdownConfig } from './component.ts'

// 布局容器类
const layoutContainer: GroupPaneType = {
  name: '布局容器类',
  components: [BoxConfig]
}

const generalContainer: GroupPaneType = {
  name: '通用',
  components: [ButtonConfig, DropdownConfig]
}

export default [layoutContainer, generalContainer]
