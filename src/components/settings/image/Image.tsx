import { Props } from '../_components/type/index.ts'
import Style from '../_components/style/Style.tsx'
import ImageAttr from '@/components/settings/image/ImageAttr.tsx'

const Image = ({ type, data }: Props) => {
  if (type === 'attr') {
    return <ImageAttr data={data} />
  } else if (type === 'style') {
    return <Style />
  }

  return null
}

export default Image
