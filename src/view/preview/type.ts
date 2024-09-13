import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import { ApiSingleProps, StateSingleProps } from '@/store/_types/context'

export interface PreviewRenderProps {
  contextData: {
    stateData: StateSingleProps[]
    apiData: ApiSingleProps[]
    methods: { [key: string]: string }
  }
  components: PaneItemType[]
}
