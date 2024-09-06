import { useDispatch, useSelector } from 'react-redux'
import { setOptionsDevice, setBoardWidth } from '@/store/modules/view.ts'
import { SelectEquipEnum } from '@/components/header/types.ts'
import { RootState } from '@/store'
import { useEffect } from 'react'
// 左侧边栏尺寸
const LEFTSIDEBARSIZE = 48
// 右侧边栏尺寸
const RIGHTSIDEBARSIZE = 400
// 画布内边距
const BOAEDPADDING = 16 * 2
// 手机默认画布大小
export const MOBILEDEFAULTSIZE = 375
export const useBoardWidth = () => {
  const dispatch = useDispatch()
  const {
    optionsDevice,
    isComLibPaneLock,
    paneVisible,
    outlineTreeVisible,
    apiVisible,
    variableVisible
  } = useSelector((state: RootState) => state.viewSplice)

  useEffect(() => {
    initBoardConfig()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isComLibPaneLock,
    paneVisible,
    outlineTreeVisible,
    apiVisible,
    variableVisible
  ])
  const initBoardConfig = () => {
    initBoardWidth()
    initOptions()
  }
  const initBoardWidth = () => {
    dispatch(setBoardWidth(computedBigSize()))
  }

  const initOptions = () => {
    dispatch(
      setOptionsDevice([
        mergeOptionWidth(computedBigSize(), SelectEquipEnum.DESKTOP),
        mergeOptionWidth(MOBILEDEFAULTSIZE, SelectEquipEnum.MOBILE)
      ])
    )
  }

  const computedBigSize = () => {
    const doc = document.documentElement.getBoundingClientRect()
    if (
      isComLibPaneLock &&
      (paneVisible || outlineTreeVisible || apiVisible || variableVisible)
    )
      return doc.width - LEFTSIDEBARSIZE - RIGHTSIDEBARSIZE - BOAEDPADDING - 350
    return doc.width - LEFTSIDEBARSIZE - RIGHTSIDEBARSIZE - BOAEDPADDING
  }

  const mergeOptionWidth = (width: number, device: SelectEquipEnum) => ({
    width,
    device
  })

  const findWidthByDevice = (key: SelectEquipEnum) => {
    return optionsDevice.find((item) => item.device === key)?.width
  }

  return {
    initBoardConfig,
    findWidthByDevice
  }
}
