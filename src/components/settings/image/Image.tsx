import { Props } from '../util/type'
import Style from '../util/style/Style.tsx'
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
