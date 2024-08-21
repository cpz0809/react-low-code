import { SelectEquipEnum } from '@/components/header/types.ts'
import { getPrefixCls } from '@/util/global-config.ts'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import { setBoardWidth } from '@/store/modules/view.ts'
import { useBoardWidth } from '@/hooks/use-board-width.ts'
import type { InputNumberProps } from 'antd'
import { InputNumber } from 'antd'
import { useState } from 'react'
import { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'

const Size = () => {
  const prefix = getPrefixCls('header')
  const dispatch = useDispatch()
  // 当前画布大小
  const boardWidth = useSelector(
    (state: RootState) => state.viewSplice.boardWidth
  )
  const { findWidthByDevice } = useBoardWidth()
  const [curBoardWidth, setCurBoardWidth] = useState<number>(boardWidth)
  // 当前选中的设备
  const [activeEquip, setActiveEquip] = useState<SelectEquipEnum>(
    SelectEquipEnum.DESKTOP
  )
  // 点击设备
  const handleBtnChangeBoardWidth = (key: SelectEquipEnum) => {
    setActiveEquip(key)
    const width = findWidthByDevice(key)
    if (!width) return
    changeBoardWidth(width)
    setCurBoardWidth(width)
  }
  // 改变画布大小
  const changeBoardWidth = (value: number) => {
    dispatch(setBoardWidth(value))
  }
  // 输入框改变画布大小
  const handleInputChangeBoardWidth: InputNumberProps['onChange'] = (value) => {
    if (value) {
      setCurBoardWidth(value as number)
    }
  }
  // 按下回车
  const handlePressEnter = () => {
    changeBoardWidth(curBoardWidth)
  }
  return (
    <>
      <div className={`${prefix}-size-select`}>
        <DesktopOutlined
          onClick={() => handleBtnChangeBoardWidth(SelectEquipEnum.DESKTOP)}
          className={`${activeEquip === SelectEquipEnum.DESKTOP ? 'size-active' : ''} `}
        />
        <MobileOutlined
          onClick={() => handleBtnChangeBoardWidth(SelectEquipEnum.MOBILE)}
          className={
            activeEquip === SelectEquipEnum.MOBILE ? 'size-active' : ''
          }
        />
      </div>
      <div className={`${prefix}-width-set`}>
        <InputNumber
          onChange={handleInputChangeBoardWidth}
          onPressEnter={handlePressEnter}
          className={`${prefix}-width-input`}
          addonAfter="px"
          value={boardWidth}
        />
      </div>
    </>
  )
}

export default Size
