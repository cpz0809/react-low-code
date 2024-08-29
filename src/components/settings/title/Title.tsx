import { Props } from '../util/type'
import Style from '../util/style/Style.tsx'
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
