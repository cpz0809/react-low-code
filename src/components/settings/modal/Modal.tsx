import { Props } from '@/components/settings/util/type'
import Style from '@/components/settings/util/style/Style.tsx'

const Modal = ({ type }: Props) => {
  return <>{type === 'style' && <Style />}</>
}
export default Modal
