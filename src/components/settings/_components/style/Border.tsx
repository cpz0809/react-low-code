import { getPrefixCls } from '@/util/global-config.ts'
import './style/border.scss'
import Row from '@/components/settings/_components/row/Row'
import Group from '@/components/settings/_components/group/Group'
import {
  borderGroup,
  borderPosition,
  borderPositionMapping,
  borderShadow,
  borderStyle
} from '@/components/settings/_components/style/data/border'
import OpacitySlider from '@/components/settings/_components/opacity-slider/OpacitySlider'
import { ColorPicker, InputNumber, Select, Space } from 'antd'
import { useState } from 'react'
import { StyleEnum } from '@/components/settings/_components/type/styleEnum'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'

const Border = () => {
  const prefixCls = getPrefixCls('edit-style-border')

  const { collect, matchingStyle } = useStyleCollect()

  const [currentGroup, setCurrentGroup] = useState(0)

  const [borderDirection, setBorderDirection] = useState<string | null>(null)

  const [boxShadowGroup, setBoxShadowGroup] = useState<number>(-1)

  const Slider = () => (
    <Row>
      <OpacitySlider
        addonAfter="px"
        styleKey={StyleEnum.BORDERRADIUS}
        unit="px"
        proportion={1}
      />
    </Row>
  )

  const handleAddBorder = (position: number) => {
    if (borderDirection !== null) {
      collect(null, borderDirection === '' ? 'border-width' : borderDirection)
    }
    setBorderDirection(borderPositionMapping[position].direction)
  }
  const BorderRadius = () => (
    <Row>
      <div className={`${prefixCls}-group`}>
        <Row title="左上">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BORDERTOPLEFTRADIUS)}
          />
        </Row>
        <Row title="右上">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BORDERTOPRIGHTRADIUS)}
          />
        </Row>
      </div>
      <div className={`${prefixCls}-group`}>
        <Row title="左下">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BORDERBOTTOMLEFTRADIUS)}
          />
        </Row>
        <Row title="右下">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BORDERBOTTOMRIGHTRADIUS)}
          />
        </Row>
      </div>
    </Row>
  )

  const mergeBorderDirection = () => {
    if (borderDirection) return borderDirection
    return StyleEnum.BORDERWIDTH
  }

  const handleBoxShadow = (index: number) => {
    const shadowStyle = matchingStyle(StyleEnum.BOXSHADOW)
    // 如果没有设置box-shadow
    if (shadowStyle === 0) {
      const defaultStr = '0 0 0 0 #000'
      collect(
        `${index === 1 ? 'inset' : ''} ${defaultStr}`,
        StyleEnum.BOXSHADOW
      )
    } else {
      boxShadowAttr(index, shadowStyle)
    }
    setBoxShadowGroup(index)
  }

  const boxShadowAttr = (index: number, shadowStyle: string) => {
    // 查找关键词
    const findStr = shadowStyle.indexOf('inset')
    if (index === 0) {
      // 外阴影 并且不存在关键词
      if (findStr === -1) return
      // 存在关键词 将关键词删除
      shadowStyle = shadowStyle.substring(findStr + 5)
    } else if (index === 1) {
      // 内阴影 存在关键词
      if (findStr !== -1) return
      // 不存在关键词 拼接关键词
      shadowStyle = `inset ${shadowStyle}`
    }
    collect(shadowStyle, StyleEnum.BOXSHADOW)
  }

  const handleEditBoxShadow = (
    value: number | string | null,
    index: number
  ) => {
    if (!value) return
    const shadowStyle = matchingStyle(StyleEnum.BOXSHADOW)
    if (shadowStyle === 0) {
      collect('0 0 0 0 #000', StyleEnum.BOXSHADOW)
    } else {
      const splitStrArr = shadowStyle
        .trimStart()
        .split(' ')
        .filter((item: string) => item !== '')
      const i = boxShadowGroup === 0 ? index : index + 1
      splitStrArr[i] = `${value}px`
      collect(splitStrArr.join(' '), StyleEnum.BOXSHADOW)
    }
  }

  return (
    <div className={`${prefixCls}`}>
      <Row title="圆角">
        <Group
          data={borderGroup}
          onclick={(e) => setCurrentGroup(e)}
          activeIndex={currentGroup}
        />
      </Row>
      {currentGroup === 0 ? Slider() : BorderRadius()}
      <Row title="边框">
        <Group data={borderPosition} onclick={(e) => handleAddBorder(e)} />
      </Row>
      {borderDirection !== null && (
        <Row>
          <Space>
            <InputNumber
              addonAfter="px"
              size="small"
              style={{ width: 120 }}
              placeholder={matchingStyle(StyleEnum.BORDERWIDTH)}
              onChange={(e) => collect(e, mergeBorderDirection())}
            />
            <ColorPicker
              onChange={(_e, hex) => collect(hex, StyleEnum.BORDERCOLOR)}
            />
            <Select
              options={borderStyle}
              style={{ width: 120 }}
              size="small"
              placeholder={matchingStyle(StyleEnum.BORDERSTYLE)}
              onChange={(e) => collect(e, StyleEnum.BORDERSTYLE)}
            />
          </Space>
        </Row>
      )}
      <Row title="阴影">
        <Group
          data={borderShadow}
          onclick={(e) => handleBoxShadow(e)}
          activeIndex={boxShadowGroup}
        />
      </Row>
      <Row>
        <Row title="阴影颜色">
          <ColorPicker
            defaultValue="#000"
            onChange={(_e, color) => handleEditBoxShadow(color, 4)}
          />
        </Row>
      </Row>
      <Row>
        <div className={`${prefixCls}-group`}>
          <Row title="x">
            <InputNumber
              size="small"
              addonAfter="px"
              onChange={(e) => handleEditBoxShadow(e, 0)}
            />
          </Row>
          <Row title="y">
            <InputNumber
              size="small"
              addonAfter="px"
              onChange={(e) => handleEditBoxShadow(e, 1)}
            />
          </Row>
        </div>
        <div className={`${prefixCls}-group`}>
          <Row title="模糊">
            <InputNumber
              size="small"
              addonAfter="px"
              onChange={(e) => handleEditBoxShadow(e, 2)}
            />
          </Row>
          <Row title="扩展">
            <InputNumber
              size="small"
              addonAfter="px"
              onChange={(e) => handleEditBoxShadow(e, 3)}
            />
          </Row>
        </div>
      </Row>
    </div>
  )
}

export default Border
