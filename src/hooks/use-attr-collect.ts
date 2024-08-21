import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentClickAttr, updateParams } from '@/store/modules/drag.ts'
import { RootState } from '@/store'

export const useAttrCollect = () => {
  const dispatch = useDispatch()
  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const collect = (key: string, value: any) => {
    update({ [key]: value })
  }

  const update = (attr: { [key: string]: any }) => {
    if (!currentClick) return
    const mergeAttr = {
      ...currentClick.attr,
      ...attr
    }
    dispatch(
      updateParams({
        uuid: currentClick.uuid,
        key: 'attr',
        params: mergeAttr
      })
    )
    dispatch(updateCurrentClickAttr(mergeAttr))
  }

  return { collect }
}
