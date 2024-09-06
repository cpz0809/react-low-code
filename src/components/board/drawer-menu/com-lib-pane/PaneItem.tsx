import './style/pane-item.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { PaneItemType } from './Type.ts'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { setPaneVisible } from '@/store/modules/view.ts'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { generateParams } from '@/util/generate-params.ts'
import { HistoryEnum } from '@/store/_types/history.ts'
import { useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { setCurrentDrag } from '@/store/modules/drag.ts'

const PaneItem = ({ data }: { data: PaneItemType }) => {
  const prefixCls = getPrefixCls('com-lib-pane')
  const dispatch = useDispatch()
  const isComLibPaneLock = useSelector(
    (state: RootState) => state.viewSplice.isComLibPaneLock
  )
  const [, dragRef, dragPreview] = useDrag(() => ({
    type: data.type,
    item: {
      ...generateParams(data),
      operate: HistoryEnum.ADD
    },
    end: () => {
      dispatch(setCurrentDrag(null))
    }
  }))

  const handleDrag = () => {
    if (!isComLibPaneLock) {
      dispatch(setPaneVisible())
    }
  }

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])
  return (
    <>
      <div className={`${prefixCls}-card`} ref={dragRef} onDrag={handleDrag}>
        <img
          src={data.svg}
          className={`${prefixCls}-card-icon`}
          alt={data.name}
        />
        <p className={`${prefixCls}-card-name`}>{data.name}</p>
      </div>
    </>
  )
}

export default PaneItem
