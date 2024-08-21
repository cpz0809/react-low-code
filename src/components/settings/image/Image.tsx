import { Props } from '../util/type'
import Style from '../util/style/Style.tsx'
import ImageAttr from '@/components/settings/image/ImageAttr.tsx'

const Image = ({ type }: Props) => {
  return (
    <>
      {type === 'attr' && <ImageAttr />}
      {type === 'style' && <Style />}
    </>
  )
}

export default Image
