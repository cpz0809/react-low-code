import { Props } from 'ahooks/lib/useControllableValue'
import TextAttr from './TestAttr'
import Style from '../util/style/Style'
const Text = ({ type, data }: Props) => {
  if (type === 'attr') {
    return <TextAttr data={data} />
  } else if (type === 'style') {
    return <Style />
  }
  return null
}

export default Text
