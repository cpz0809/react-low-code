type InputExtend = 'text' | 'password' | 'number'

type DateExtend = 'date' | 'time'

type FormItemType = 'Input' | 'Date' | 'Select'

type FormItem<T extends FormItemType = FormItemType> = {
  type: T
  label?: string
  typeExtend?: T extends 'Input'
    ? InputExtend
    : T extends 'Date'
      ? DateExtend
      : never
}

const columns: FormItem[] = [
  {
    label: 'text',
    type: 'Input',
    typeExtend: 'number'
  }
]
