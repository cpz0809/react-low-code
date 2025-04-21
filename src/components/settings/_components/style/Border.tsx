import { getPrefixCls } from '@/util/global-config.ts'
import './style/border.scss'
import Row from '@/components/settings/_components/row/Row'
import Group from '@/components/settings/_components/group/Group'
import {
  borderGroup,
  borderPosition,
  borderShadow,
  borderStyle
} from '@/components/settings/_components/style/data/border'
import OpacitySlider from '@/components/settings/_components/opacity-slider/OpacitySlider'
import { ColorPicker, InputNumber, Select, Space } from 'antd'
import { useState } from 'react'
import { StyleEnum } from '@/components/settings/_components/_types/styleEnum'
import { useStyleCollect } from '@/components/board/_hooks/use-style-collect.ts'
import { capitalize } from '@/util/handleStr.ts'

const Border = () => {
  const prefixCls = getPrefixCls('edit-style-border')

  const { collect, matchingStyle } = useStyleCollect()

  const [currentGroup, setCurrentGroup] = useState(0)

  const [borderActiveIndex, setBorderActiveIndex] = useState<number>(-1)

  const [boxShadowGroup, setBoxShadowGroup] = useState<number>(-1)

  const Slider = () => (
    <Row>
      <OpacitySlider
        addonAfter="px"
        styleKey={StyleEnum.BorderRadius}
        unit="px"
        proportion={1}
      />
    </Row>
  )

  const handleAddBorder = (position: number) => {
    setBorderActiveIndex(position)
  }

  const BorderRadius = () => (
    <Row>
      <div className={`${prefixCls}-group`}>
        <Row title="左上">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BorderTopLeftRadius)}
          />
        </Row>
        <Row title="右上">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BorderTopRightRadius)}
          />
        </Row>
      </div>
      <div className={`${prefixCls}-group`}>
        <Row title="左下">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BorderBottomLeftRadius)}
          />
        </Row>
        <Row title="右下">
          <InputNumber
            size="small"
            addonAfter="px"
            onChange={(e) => collect(e, StyleEnum.BorderBottomRightRadius)}
          />
        </Row>
      </div>
    </Row>
  )

  const mergeBorderDirection = (type: 'width' | 'style' | 'color') => {
    const borderDirection = borderPosition[borderActiveIndex].style
    if (borderDirection === 'all') return `border-${type}`
    return `border-${borderDirection}-${type}`
  }

  const handleBoxShadow = (index: number) => {
    const shadowStyle = matchingStyle(StyleEnum.BoxShadow)
    // 如果没有设置样式 需要兼容 inset 所以需要给一个默认值 本身css box-shadow默认值 = 0 0 0 0 #000
    if (shadowStyle === 0) {
      collect(defaultShadow().join(' '), StyleEnum.BoxShadow)
    }
    setBoxShadowGroup(index)
  }

  const handleEditBoxShadow = (
    value: number | string | null,
    index: number
  ) => {
    if (!value) return

    const shadowStyle = matchingStyle(StyleEnum.BoxShadow)

    // 使用,拆分 如果长度>1说明同时设置了内外阴影
    const split = shadowStyle.split(',')
    if (split.length > 1) {
      const arr = split[boxShadowGroup === 1 ? 0 : 1]
      const splitStrArr = filterShadow(arr)
      insertVal(splitStrArr, index)
      split[boxShadowGroup === 1 ? 0 : 1] = splitStrArr.join(' ')
      collect(split.join(' ,'), StyleEnum.BoxShadow)
    } else {
      const splitStrArr = filterShadow(shadowStyle)
      // 根据是否存在inset关键字来判断是否需要追加字符串
      const shouldUseDefaultShadow =
        (splitStrArr.includes('inset') && boxShadowGroup === 0) ||
        (!splitStrArr.includes('inset') && boxShadowGroup === 1)
      if (shouldUseDefaultShadow) {
        const targetArray = defaultShadow()
        insertVal(targetArray, index)
        collect(
          `${targetArray.join(' ')} , ${splitStrArr.join(' ')}`,
          StyleEnum.BoxShadow
        )
        return
      }
      insertVal(splitStrArr, index)
      collect(splitStrArr.join(' '), StyleEnum.BoxShadow)
    }

    function insertVal(arr: string[], index: number) {
      const i = boxShadowGroup === 0 ? index : index + 1
      arr[i] = `${value}px`
    }

    function filterShadow(str: string) {
      return str
        .trimStart()
        .split(' ')
        .filter((item: string) => item !== '')
    }
  }

  function defaultShadow() {
    const defaultArr = ['0', '0', '0', '0', '#000']
    if (boxShadowGroup === 1) {
      defaultArr.push('inset')
    }
    return defaultArr
  }

  const getStyleKey = (type: 'width' | 'style' | 'color') => {
    if (borderActiveIndex > 3)
      return `Border${capitalize(type)}` as keyof typeof StyleEnum
    return `Border${capitalize(borderPosition[borderActiveIndex]?.style)}${capitalize(type)}` as keyof typeof StyleEnum
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
        <Group
          data={borderPosition}
          onclick={(e) => handleAddBorder(e)}
          activeIndex={borderActiveIndex ?? -1}
        />
      </Row>
      {borderActiveIndex !== -1 &&
        new Array(5).fill(0).map(
          (_, index) =>
            index === borderActiveIndex && (
              <Row key={index}>
                <Space>
                  <InputNumber
                    addonAfter="px"
                    size="small"
                    style={{ width: 120 }}
                    placeholder={matchingStyle(StyleEnum[getStyleKey('width')])}
                    onChange={(e) => collect(e, mergeBorderDirection('width'))}
                  />
                  <ColorPicker
                    onChange={(_e, hex) =>
                      collect(hex, mergeBorderDirection('color'))
                    }
                  />
                  <Select
                    options={borderStyle}
                    style={{ width: 120 }}
                    size="small"
                    placeholder={matchingStyle(
                      StyleEnum[getStyleKey('style')],
                      '请选择'
                    )}
                    onChange={(e) => collect(e, mergeBorderDirection('style'))}
                  />
                </Space>
              </Row>
            )
        )}
      )
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
      {new Array(2).fill(0).map(
        (_, index) =>
          index === boxShadowGroup && (
            <Row key={index}>
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
          )
      )}
    </div>
  )
}

export default Border
