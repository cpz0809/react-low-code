import './index.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'

interface GroupPropsType {
  data: { [key: string]: any }[]
  keyName?: string
  onclick?: (index: number) => void
  activeIndex?: number
  paramsKey?: string | null
}

const Group = ({
  data,
  keyName = 'name',
  onclick,
  activeIndex = -1,
  paramsKey = null
}: GroupPropsType) => {
  const prefixCls = getPrefixCls('group')

  const { collect, isStyleActive, isAttrActive } = useStyleCollect()
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
          className={`${prefixCls}-item ${isStyleActive(item.style) || isAttrActive(paramsKey, item.style) ? `${prefixCls}-item-active` : ''} ${activeIndex === index ? `${prefixCls}-item-active` : ''}`}
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
