import ImageAttr from '@/components/settings/image/ImageAttr.tsx'
import {
  EditableTypeItem,
  PaneItemType
} from '@/components/_types/util.ts'
import { ImageAttrType } from './type.ts'

class Image {
  static of(data: PaneItemType<ImageAttrType>, type: EditableTypeItem) {
    switch (type) {
      case 'attr':
        return <ImageAttr data={data} />
      case 'event':
    }
  }
}

export default Image
