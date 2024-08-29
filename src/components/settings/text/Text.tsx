import TextAttr from './TestAttr'
import Style from '../util/style/Style'
import { Props } from '../util/type'
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
