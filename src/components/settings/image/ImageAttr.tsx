import Row from '@/components/settings/util/row/Row.tsx'
import { Input } from 'antd'
import { useAttrCollect } from '@/hooks/use-attr-collect.ts'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'

enum ImageAttrEnum {
  SRC = 'src',
  TITLE = 'title',
  ALT = 'alt'
}

const ImageAttr = ({ data }: { data: PaneItemType | undefined }) => {
  const { collect } = useAttrCollect()
  return (
    <div className="edit-custom-attr-content">
      <Row title="图片链接">
        <Input
          size="small"
          onChange={(e) => collect(ImageAttrEnum.SRC, e.target.value)}
        />
      </Row>
      <Row title="标题">
        <Input
          size="small"
          onChange={(e) => collect(ImageAttrEnum.TITLE, e.target.value)}
        />
      </Row>
      <Row title="代替文本">
        <Input
          size="small"
          onChange={(e) => collect(ImageAttrEnum.ALT, e.target.value)}
        />
      </Row>
    </div>
  )
}

export default ImageAttr
