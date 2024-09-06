import { Input } from 'antd'
import { useAttrCollect } from '@/hooks/use-attr-collect.ts'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import { ImageAttrType } from './type'
import VariableBindingRow from '../_components/variable-binding-row/VariableBindingRow'

enum ImageAttrEnum {
  SRC = 'src',
  TITLE = 'title',
  ALT = 'alt'
}

const ImageAttr = ({ data }: { data: PaneItemType<ImageAttrType> }) => {
  const { collect, mapValue } = useAttrCollect()
  const { src, title, alt } = mapValue(data.attr)
  return (
    <div className="edit-custom-attr-content">
      <VariableBindingRow title="图片链接" paramsKey={ImageAttrEnum.SRC}>
        <Input
          value={src}
          onChange={(e) => collect(ImageAttrEnum.SRC, e.target.value)}
        />
      </VariableBindingRow>
      <VariableBindingRow title="标题" paramsKey={ImageAttrEnum.TITLE}>
        <Input
          value={title}
          onChange={(e) => collect(ImageAttrEnum.TITLE, e.target.value)}
        />
      </VariableBindingRow>
      <VariableBindingRow title="代替文本" paramsKey={ImageAttrEnum.ALT}>
        <Input
          value={alt}
          onChange={(e) => collect(ImageAttrEnum.ALT, e.target.value)}
        />
      </VariableBindingRow>
    </div>
  )
}

export default ImageAttr
