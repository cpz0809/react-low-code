import { GroupPaneType } from '@/components/_types/util.ts'
import { BoxConfig, ButtonConfig } from './component'

// 布局容器类
const layoutContainer: GroupPaneType = {
  name: '布局容器类',
  components: [BoxConfig]
}

const generalContainer: GroupPaneType = {
  name: '通用',
  components: [ButtonConfig]
}

export default [layoutContainer, generalContainer]
