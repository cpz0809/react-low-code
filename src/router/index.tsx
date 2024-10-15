import BoardView from '@/view/board-view/boardView'
import Preview from '@/view/preview/preview'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/view/login/Login.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
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
