import './style/background.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { ColorPicker } from 'antd'
import React, { useState } from 'react'
import { Input } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import Row from '@/components/settings/util/row/Row.tsx'
import Group from '@/components/settings/util/group/Group.tsx'
import {
  background,
  position,
  repeatShow,
  size
} from '@/components/settings/util/style/data/background.ts'
import OpacitySlider from '../opacity-slider/OpacitySlider.tsx'
import { StyleEnum } from '@/components/settings/util/type/styleEnum.ts'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import InputMergeSelect, {
  UnitType
} from '@/components/settings/util/input-merge-select/InputMergeSelect.tsx'

const Background = () => {
  const prefixCls = getPrefixCls('edit-style-background')
  const { collect, matchingStyle } = useStyleCollect()

  const [currentGroup, setCurrentGroup] = useState(0)

  const Opacity = () => (
    <Row title="透明度">
      <OpacitySlider addonAfter="%" styleKey={StyleEnum.OPACITY} />
    </Row>
  )

  const ColorFill = () => (
    <>
      <ColorPicker
        className="color-picker"
        onChange={(_e, hex) => collect(hex, StyleEnum.BACKGROUNDCOLOR, '')}
      />
      {Opacity()}
    </>
  )
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    collect(value ? `url(${value})` : null, StyleEnum.BACKGROUNDIMAGE, '')
  }

  const handleBackgroundSize = (
    value: number,
    key: string,
    position: number,
    unit: UnitType
  ) => {
    // 如果之前没有设置过属性
    const match = matchingStyle(key)
    if (!match) {
      return `${position === 0 ? `${value}${unit}` : 'auto'} ${position === 1 ? `${value}${unit}` : 'auto'}`
    }
    // 找到x或y的位置并替换新的值
    const split = match.split(' ')
    split[position] = `${value}${unit}`
    return split.join(' ')
  }

  const BackgroundImage = () => (
    <>
      <Input
        size="small"
        placeholder="请输入图片url"
        prefix={<FileImageOutlined />}
        style={{ marginBottom: 10 }}
        onChange={(e) => handleImageUrlChange(e)}
      />
      <Row title="尺寸">
        <Group data={size} />
      </Row>
      <Row>
        <div className="size-group">
          <div className="input-item">
            <p>宽</p>
            <InputMergeSelect
              styleKey={StyleEnum.BACKGROUNDSIZE}
              attrPosition={0}
              onCollectStyle={(value, key, unit) =>
                handleBackgroundSize(value, key, 0, unit)
              }
            />
          </div>
          <div className="input-item">
            <p>高</p>
            <InputMergeSelect
              styleKey={StyleEnum.BACKGROUNDSIZE}
              attrPosition={1}
              onCollectStyle={(value, key, unit) =>
                handleBackgroundSize(value, key, 1, unit)
              }
            />
          </div>
        </div>
      </Row>

      <Row title="定位">
        <div className="position-container">
          <div className="position-group">
            {position.map((item) => (
              <div
                key={item.name}
                className="position-item"
                onClick={() => collect(item.style)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="position-size">
            <div className="input-item">
              <p>左</p>
              <InputMergeSelect
                styleKey={StyleEnum.BACKGROUNDPOSITION}
                attrPosition={0}
                onCollectStyle={(value, key, unit) =>
                  handleBackgroundSize(value, key, 0, unit)
                }
              />
            </div>
            <div className="input-item">
              <p>顶</p>
              <InputMergeSelect
                styleKey={StyleEnum.BACKGROUNDPOSITION}
                attrPosition={1}
                onCollectStyle={(value, key, unit) =>
                  handleBackgroundSize(value, key, 1, unit)
                }
              />
            </div>
          </div>
        </div>
      </Row>
      <Row title="重复显示">
        <Group data={repeatShow} />
      </Row>
      {Opacity()}
    </>
  )
  return (
    <div className={`${prefixCls}`}>
      <Row title="背景">
        <Group data={background} onclick={(index) => setCurrentGroup(index)} activeIndex={currentGroup} />
      </Row>
      <div className={`${prefixCls}-content`}>
        {currentGroup === 0 && ColorFill()}
        {currentGroup === 1 && BackgroundImage()}
      </div>
    </div>
  )
}

export default Background
