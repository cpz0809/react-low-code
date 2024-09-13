import BoardView from '@/view/board-view/boardView'
import Preview from '@/view/preview/preview'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardView />
  },
  {
    path: '/preview',
    element: <Preview />
  }
])

export default router
