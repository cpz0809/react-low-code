import './style/index.scss'
import { Button, Tooltip, Modal } from 'antd'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { getPrefixCls } from '@/util/global-config.ts'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { clearDiagCom, setCurrentClick } from '@/store/modules/drag.ts'
import { useHistory } from '@/hooks/use-history.ts'
import Size from '@/components/header/Size.tsx'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const prefix = getPrefixCls('header')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 历史记录
  const { historyList, currentStep } = useSelector(
    (state: RootState) => state.historySlice
  )
  const { restore, revoke } = useHistory()

  // 清除画布
  const handleClearBoard = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Modal.confirm({
      content: '是否确认重置页面?',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        dispatch(clearDiagCom())
        dispatch(setCurrentClick(null))
      }
    })
  }
  // 恢复
  return (
    <div className={`${prefix}-container`}>
      {/* 左侧 */}
      <div className={`${prefix}-left`}></div>
      {/* 中间 */}
      <div className={`${prefix}-center`}>
        <Size />
      </div>
      {/* 右侧 */}
      <div className={`${prefix}-right`}>
        <div className={`${prefix}-action-item`}>
          <div className={`${prefix}-plugin-undo-redo`}>
            <Tooltip placement="bottom" title="撤销">
              <Button
                onClick={revoke}
                icon={<UndoOutlined />}
                disabled={historyList.length === 0 || currentStep < 0}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="恢复">
              <Button
                onClick={restore}
                icon={<RedoOutlined />}
                disabled={
                  historyList.length === 0 ||
                  currentStep === historyList.length - 1
                }
              />
            </Tooltip>
          </div>
        </div>
        <div className={`${prefix}-action-item`}>
          <Button className={`${prefix}-button`} onClick={handleClearBoard}>
            重置页面
          </Button>
        </div>
        <div className={`${prefix}-action-item`}>
          <Button
            type="primary"
            className={`${prefix}-button`}
            onClick={() => navigate('/preview')}
          >
            预览
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
