import { EditableTypeItem, PaneItemType } from '@/components/_types/util.ts'
import BoxAttr from '@/components/settings/box/BoxAttr.tsx'
import { ButtonAttrType } from '@/components/settings/button/type.ts'

class Box {
  static of(data: PaneItemType<ButtonAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <BoxAttr data={data} />
    }
  }
}

export default Box
