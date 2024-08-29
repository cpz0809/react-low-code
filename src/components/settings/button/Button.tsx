import Style from '../util/style/Style'
import { Props } from '../util/type'
import ButtonAttr from './ButtonAttr'

const Button = ({ type, data }: Props) => {
  if (type === 'attr') {
    return <ButtonAttr data={data} />
  } else if (type === 'style') {
    return <Style />
  }

  return null
}

export default Button
