import Board from '@/components/board/Board.tsx'
import Header from '@/components/header/Header.tsx'
import './index.scss'
import { getPrefixCls } from '@/util/global-config'

const BoardView = () => {
  const prefixCls = getPrefixCls('board-view')
  return (
    <div className={`${prefixCls}`}>
      <Header />
      <Board />
    </div>
  )
}

export default BoardView
