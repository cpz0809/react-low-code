export interface VariableBindingProps {
  visible: boolean
  paramsKey: string
  isChangeAttr?: boolean
  onClose: () => void
  onSuccess?: (name: string) => void
}
