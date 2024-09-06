import { SingleStyleType } from '@/components/settings/_components/_types'

export const selectPosition = [
  {
    value: 'static',
    label: 'static'
  },
  {
    value: 'relative',
    label: 'relative'
  },
  {
    value: 'absolute',
    label: 'absolute'
  },
  {
    value: 'fixed',
    label: 'fixed'
  },
  {
    value: 'sticky',
    label: 'sticky'
  }
]

export const floatPosition: SingleStyleType[] = [
  { name: '不浮动', style: 'float: none' },
  { name: '左浮动', style: 'float: left' },
  { name: '右浮动', style: 'float: right' }
]

export const clearFloat: SingleStyleType[] = [
  { name: '不清除', style: 'clear: none' },
  { name: '左清除', style: 'clear: left' },
  { name: '右清除', style: 'clear: right' },
  { name: '两边清除', style: 'clear: both' }
]
