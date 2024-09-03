import { Props } from '../_components/type/index.ts'
import Style from '../_components/style/Style.tsx'
import TitleAttr from './TitleAttr.tsx'
import { TextNodeAttrType } from '../text/type'

const Title = ({ type, data }: Props<TextNodeAttrType>) => {
  if (type === 'attr' && data) {
    return <TitleAttr data={data} />
  } else if (type === 'style') {
    return <Style />
  }
  return null
}

export default Title
