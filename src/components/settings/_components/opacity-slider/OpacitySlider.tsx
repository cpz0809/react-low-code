import { Slider, InputNumber } from 'antd'
import { getPrefixCls } from '@/util/global-config.ts'
import './index.scss'
import { StyleEnum } from '@/components/settings/_components/type/styleEnum'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import { UnitType } from '@/components/settings/_components/input-merge-select/InputMergeSelect'

const OpacitySlider = ({
  addonAfter,
  styleKey,
  unit,
  proportion = 100
}: {
  addonAfter?: string
  styleKey: StyleEnum
  unit?: UnitType
  proportion?: number
}) => {
  const prefixCls = getPrefixCls('opacity-slider')
  const { collect } = useStyleCollect()
  const computedProportionV = (count: number, unit?: string) => {
    return unit === '%' ? count / proportion : count
  }
  return (
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-slider`}>
        <Slider
          onChange={(e) => collect(e / proportion, styleKey, unit || '')}
        />
      </div>
      <div className={`${prefixCls}-input`}>
        <InputNumber
          size="small"
          addonAfter={addonAfter}
          onChange={(e) =>
            collect(
              computedProportionV(e as number, addonAfter),
              styleKey,
              unit || ''
            )
          }
        />
      </div>
    </div>
  )
}
export default OpacitySlider
