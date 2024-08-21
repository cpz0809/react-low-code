import './index.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'

interface GroupPropsType {
  data: { [key: string]: any }[]
  keyName?: string
  onclick?: (index: number) => void
  activeIndex?: number
}

const Group = ({
  data,
  keyName = 'name',
  onclick,
  activeIndex = -1
}: GroupPropsType) => {
  const prefixCls = getPrefixCls('group')

  const { collect, isActive } = useStyleCollect()

  const handleCollect = (style: string, index: number) => {
    if (onclick) {
      onclick(index)
    }
    if (!activeIndex) return
    collect(style)
  }

  return (
    <div className={`${prefixCls}-container`}>
      {data.map((item, index) => (
        <div
          className={`${prefixCls}-item ${isActive(item.style) ? `${prefixCls}-item-active` : ''} ${activeIndex === index ? `${prefixCls}-item-active` : ''}`}
          key={item[keyName]}
          onClick={() => handleCollect(item.style, index)}
        >
          {item[keyName]}
        </div>
      ))}
    </div>
  )
}
export default Group
