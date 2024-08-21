import { Select, InputNumber } from 'antd'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import { useState } from 'react'

export type UnitType = 'px' | '%'

interface InputMergeSelectProps {
  styleKey: string
  onCollectStyle?: (value: number, key: string, unit: UnitType) => string
  onChangeUnit?: (key: string, unit: UnitType) => string
  attrPosition?: number
}

const InputMergeSelect = ({
  styleKey,
  onCollectStyle,
  onChangeUnit,
  attrPosition
}: InputMergeSelectProps) => {
  const { collect, matchingUnit, updateUnit, matchingStyle } = useStyleCollect()

  const mateStyle = matchingStyle(styleKey)

  const [unitState, setUnitState] = useState<UnitType>(matchingUnit(styleKey))

  const handleChangeUnit = (e: UnitType) => {
    const handleUnit = onChangeUnit?.(styleKey, e) || e
    if (mateStyle !== 0) {
      updateUnit(styleKey, unitState, handleUnit, attrPosition)
    }
    setUnitState(handleUnit as UnitType)
  }

  const InputAddonAfter = () => (
    <Select
      defaultValue={unitState}
      onChange={(e) => handleChangeUnit(e)}
      style={{ width: 60 }}
      options={[
        { value: 'px', label: 'px' },
        { value: '%', label: '%' }
      ]}
    />
  )

  const handleCollect = (e: number) => {
    const handlerStyle = onCollectStyle?.(e, styleKey, unitState)
    collect(handlerStyle || e, styleKey, unitState)
  }

  return (
    <InputNumber
      size="small"
      onChange={(e) => handleCollect(e as number)}
      addonAfter={InputAddonAfter()}
      placeholder={mateStyle}
    />
  )
}

export default InputMergeSelect
