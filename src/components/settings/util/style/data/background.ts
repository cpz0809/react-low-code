import { SingleStyleType } from '@/components/settings/util/type'

export const background = [
  {
    name: '颜色填充'
  },
  {
    name: '背景图片'
  }
]

export const size: SingleStyleType[] = [
  {
    name: '等比填充',
    style: 'background-size: contain'
  },
  {
    name: '等比覆盖',
    style: 'background-size: cover'
  }
]

export const position: SingleStyleType[] = [
  {
    name: '左上',
    style: 'background-position:0 0'
  },
  {
    name: '上',
    style: 'background-position:50% 0'
  },
  {
    name: '右上',
    style: 'background-position:100% 0'
  },
  {
    name: '左中',
    style: 'background-position:0 50%'
  },
  {
    name: '中',
    style: 'background-position:50% 50%'
  },
  {
    name: '右中',
    style: 'background-position:100% 50%'
  },
  {
    name: '左下',
    style: 'background-position:0 100%'
  },
  {
    name: '下',
    style: 'background-position:50% 100%'
  },
  {
    name: '右下',
    style: 'background-position:100% 100%'
  }
]

export const repeatShow: SingleStyleType[] = [
  {
    name: '垂直水平',
    style: 'background-repeat: repeat'
  },
  {
    name: '水平',
    style: 'background-repeat: repeat-x'
  },
  {
    name: '垂直',
    style: 'background-repeat: repeat-y'
  },
  {
    name: '不重复',
    style: 'background-repeat: no-repeat'
  }
]
