import {
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons'

export const routers = [
  {
    path: 'member',
    icon: <UserOutlined className="team-manage-menu-item-icon" />,
    title: '成员管理'
  },
  {
    path: 'approval',
    icon: <UsergroupAddOutlined className="team-manage-menu-item-icon" />,
    title: '团队加入审批'
  },
  {
    path: 'setting',
    icon: <SettingOutlined className="team-manage-menu-item-icon" />,
    title: '团队设置'
  }
]
