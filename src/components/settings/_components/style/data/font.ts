import { SingleStyleType } from '@/components/settings/_components/_types'

export const alignment: SingleStyleType[] = [
  {
    name: '左对齐',
    style: 'text-align:left'
  },
  {
    name: '居中对齐',
    style: 'text-align:center'
  },
  {
    name: '右对齐',
    style: 'text-align:right'
  },
  {
    name: '两端对齐',
    style: 'text-align:justify'
  }
]

export const selectFontWeight = [
  { value: '100', label: '100 Thin' },
  { value: '200', label: '200 Extra Light' },
  { value: '300', label: '300 Light' },
  { value: '400', label: '400 Normal' },
  { value: '500', label: '500 Medium' },
  { value: '600', label: '600 Semi Bold' },
  { value: '700', label: '700 Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' }
]

export const selectFontFamily = [
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Arial', label: 'Arial' },
  { value: 'serif', label: 'serif' }
]
