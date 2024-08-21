import './style/font.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { ColorPicker, InputNumber, Select } from 'antd'
import { selectFontFamily, selectFontWeight } from './data/font.ts'
import { alignment } from '@/components/settings/util/style/data/font.ts'
import Row from '@/components/settings/util/row/Row.tsx'
import Group from '@/components/settings/util/group/Group.tsx'
import OpacitySlider from '@/components/settings/util/opacity-slider/OpacitySlider.tsx'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import { StyleEnum } from '@/components/settings/util/type/styleEnum.ts'

const Font = () => {
  const prefixCls = getPrefixCls('edit-style-font')
  const { collect, matchingUnit, matchingStyle } = useStyleCollect()
  return (
    <div className={`${prefixCls}`}>
      <div className="inner-row-container">
        <div className="row-item">
          <p>字号</p>
          <InputNumber
            size="small"
            onChange={(e) => collect(e, StyleEnum.FONTSIZE)}
            addonAfter={matchingUnit(StyleEnum.FONTSIZE)}
            placeholder={matchingStyle(StyleEnum.FONTSIZE, 12)}
          />
        </div>
        <div className="row-item">
          <p>行高</p>
          <InputNumber
            size="small"
            onChange={(e) => collect(e, StyleEnum.LINEHEIGHT)}
            addonAfter={matchingUnit(StyleEnum.LINEHEIGHT)}
            placeholder={matchingStyle(StyleEnum.LINEHEIGHT, 15)}
          />
        </div>
      </div>
      <div className="row-item">
        <p>字重</p>
        <Select
          onChange={(e) => collect(e, StyleEnum.FONTWEIGHT)}
          placeholder="请选择"
          options={selectFontWeight}
          style={{ width: '100%' }}
          size="small"
        />
      </div>
      <div className="row-item">
        <p>字体</p>
        <Select
          onChange={(e) => collect(e, StyleEnum.FONTFAMILY)}
          placeholder="请选择"
          options={selectFontFamily}
          style={{ width: '100%' }}
          size="small"
        />
      </div>
      <div className="row-item">
        <p>文字颜色</p>
        <ColorPicker
          defaultValue="#000000"
          onChange={(_e, hex) => collect(hex, StyleEnum.COLOR)}
        />
      </div>
      <Row title="对齐">
        <Group data={alignment} />
      </Row>
      <Row title="透明度">
        <OpacitySlider styleKey={StyleEnum.OPACITY} />
      </Row>
    </div>
  )
}

export default Font
