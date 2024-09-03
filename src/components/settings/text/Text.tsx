import TextAttr from './TestAttr'
import Style from '../_components/style/Style'
import { Props } from '../_components/type'
import { TextNodeAttrType } from './type'
const Text = ({ type, data }: Props<TextNodeAttrType>) => {
  if (type === 'attr' && data) {
    return <TextAttr data={data} />
  } else if (type === 'style') {
    return <Style />
  }
  return null
}

export default Text
