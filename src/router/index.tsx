import BoardView from '@/view/board-view/boardView'
import Preview from '@/view/preview/preview'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/view/login/Login.tsx'
import ProjectManage from '@/view/project-manage/ProjectManage.tsx'
import Home from '@/view/home'
import TeamManage from '@/view/team-manage'
import Members from '@/view/team-manage/Members.tsx'
import Approval from '@/view/team-manage/Approval.tsx'
import Setting from '@/view/team-manage/Setting.tsx'
import Permission from '@/permission'
import InviteConfirm from '@/view/invite-confirm'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Permission />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/team',
        element: <TeamManage />,
        children: [
          {
            path: 'member',
            element: <Members />
          },
          {
            path: 'approval',
            element: <Approval />
          },
          {
            path: 'setting',
            element: <Setting />
          }
        ]
      },
      {
        path: '/project-manage',
        element: <ProjectManage />
      },
      {
        path: '/invite-confirm',
        element: <InviteConfirm />
      },
      {
        path: '/assemble',
        element: <BoardView />
      },
      {
        path: '/preview',
        element: <Preview />
      }
    ]
  }
])

export default router
