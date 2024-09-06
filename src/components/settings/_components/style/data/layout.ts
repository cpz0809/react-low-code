import { SingleStyleType } from '@/components/settings/_components/_types'

export const modeData: SingleStyleType[] = [
  {
    name: '内联',
    style: 'display:inline'
  },
  {
    name: '弹性',
    style: 'display:flex'
  },
  {
    name: '块级',
    style: 'display:block'
  },
  {
    name: '内联块',
    style: 'display:inline-block'
  },
  {
    name: '隐藏',
    style: 'display:none'
  }
]

interface DistanceType {
  key: string
  tips?: string
}

export const distanceData: DistanceType[] = [
  {
    key: 'margin-top'
  },
  {
    key: 'margin-right'
  },
  {
    key: 'margin-bottom',
    tips: '外边距'
  },
  {
    key: 'margin-left'
  },
  {
    key: 'padding-top'
  },
  {
    key: 'padding-right'
  },
  {
    key: 'padding-bottom',
    tips: '内边距'
  },
  {
    key: 'padding-left'
  }
]
