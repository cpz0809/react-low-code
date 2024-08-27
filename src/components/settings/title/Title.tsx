import { Props } from '../util/type'
import Style from '../util/style/Style.tsx'
import TitleAttr from './TitleAttr.tsx'

const Title = ({ type, data }: Props) => {
  if (type === 'attr') {
    return <TitleAttr data={data} />
  } else if (type === 'style') {
    return <Style />
  }
  return null
}

export default Title
