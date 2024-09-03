import { setVariableBindingVisible } from '@/store/modules/view'
import { SettingFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

const VariableSwitch = () => {
  const dispatch = useDispatch()
  return <SettingFilled onClick={() => dispatch(setVariableBindingVisible())} />
}

export default VariableSwitch
