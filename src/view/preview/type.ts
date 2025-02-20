import { PaneItemType } from '@/components/_types/util.ts'
import { ApiSingleProps, VariableSingleProps } from '@/store/_types/context'

export interface PreviewRenderProps {
  contextData: {
    stateData: VariableSingleProps[]
    apiData: ApiSingleProps[]
    methods: { [key: string]: string }
  }
  components: PaneItemType[]
}
