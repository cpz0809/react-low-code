import { Props } from '@/components/settings/_components/type'
import Style from '../_components/style/Style'

const Modal = ({ type }: Props) => {
  return <>{type === 'style' && <Style />}</>
}
export default Modal
