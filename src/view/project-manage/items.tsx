import { MenuProps } from 'antd'

export const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    )
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item'
  }
]

export const selectScales: MenuProps['items'] = [
  {
    key: '4',
    label: <p className="project-manage-scale-select">400%</p>
  },
  {
    key: '5',
    label: <p className="project-manage-scale-select">200%</p>
  },
  {
    key: '6',
    label: <p className="project-manage-scale-select">150%</p>
  },
  {
    key: '7',
    label: <p className="project-manage-scale-select">100%</p>
  },
  {
    key: '8',
    label: <p className="project-manage-scale-select">50%</p>
  },
  {
    key: '9',
    label: <p className="project-manage-scale-select">25%</p>
  }
]

export const changeColors = [
  {
    bgColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(193, 194, 196)'
  },
  {
    bgColor: 'rgb(240, 242, 245)',
    borderColor: 'rgb(193, 194, 196)'
  },
  {
    bgColor: 'rgb(228, 231, 235)',
    borderColor: 'rgb(193, 194, 196)'
  },
  {
    bgColor: 'rgb(70, 70, 70)',
    borderColor: 'rgb(28, 28, 28)'
  },
  {
    bgColor: 'rgb(44, 44, 44)',
    borderColor: 'rgb(0, 0, 0)'
  },
  {
    bgColor: 'rgb(255, 249, 238)',
    borderColor: 'rgb(250, 215, 141)'
  },
  {
    bgColor: 'rgb(254, 246, 244)',
    borderColor: 'rgb(249, 195, 181)'
  },
  {
    bgColor: 'rgb(238, 250, 243)',
    borderColor: 'rgb(138, 221, 173)'
  },
  {
    bgColor: 'rgb(235, 244, 255)',
    borderColor: 'rgb(155, 202, 255)'
  },
  {
    bgColor: 'rgb(242, 240, 255)',
    borderColor: 'rgb(189, 180, 254)'
  }
]
