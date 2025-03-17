import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/_types/util.ts'
import DropdownAttr from './DropdownAttr.tsx'
import { DropdownAttrType } from './type.ts'

class Dropdown {
  static of(data: PaneItemType<DropdownAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <DropdownAttr data={data} />
      case 'event':
    }
  }
}

export default Dropdown
