import { EditableTypeItem, PaneItemType } from '@/components/_types/util.ts'
import TabsAttr from '@/components/settings/tabs/TabsAttr.tsx'
import { TabsAttrType } from '@/components/settings/tabs/type.ts'

class Tabs {
  static of(data: PaneItemType<TabsAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <TabsAttr data={data} />
      case 'event':
    }
  }
}

export default Tabs
