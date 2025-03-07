import { EditableTypeItem, PaneItemType } from '@/components/_types/util.ts'
import FlexAttr from '@/components/settings/flex/FlexAttr.tsx'
import { FlexAttrType } from '@/components/settings/flex/type.ts'

class Flex {
  static of(data: PaneItemType<FlexAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <FlexAttr data={data} />
      case 'event':
    }
  }
}

export default Flex
