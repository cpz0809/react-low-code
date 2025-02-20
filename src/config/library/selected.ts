import { GroupPaneType } from '@/components/_types/util.ts'
import {
  DrawerConfig,
  ImageConfig,
  ModalConfig,
  TabsConfig,
  TextConfig,
  TitleConfig
} from './component'

// 基础元素组件
const exquisite: GroupPaneType = {
  name: '基础元素',
  components: [ImageConfig, TitleConfig, TextConfig]
}
// 布局容器组件
const layoutContainer: GroupPaneType = {
  name: '布局容器类',
  components: [ModalConfig, DrawerConfig, TabsConfig]
}

export default [exquisite, layoutContainer]
