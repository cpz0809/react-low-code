import Style from '@/components/settings/util/style/Style.tsx'
import { Props } from '@/components/settings/util/type'

const Main = ({ type }: Props) => {
  return <>{type === 'style' && <Style />}</>
}
export default Main
