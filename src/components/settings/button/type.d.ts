import { ButtonType } from 'antd/lib/button/buttonHelpers'
import { SizeType } from 'antd/es/config-provider/SizeContext'
export interface ButtonAttrType {
  children: string
  type: ButtonType
  size: SizeType
  loading: boolean
  disabled: boolean
}
