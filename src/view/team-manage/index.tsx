import './styles/index.scss'
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { routers } from '@/view/team-manage/items.tsx'
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

const TeamManage = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  return (
    <div className="team-manage">
      <div className="team-manage-nav-bar">
        <Link to="/" replace={true} className="team-manage-nav-bar-left">
          <ArrowLeftOutlined className="team-manage-nav-bar-left-back" />
          <Dropdown menu={{ items: [{ label: <p>13</p>, key: '1' }] }}>
            <div className="team-manage-nav-bar-left-dropdown">
              <p className="team-manage-nav-bar-title">M</p>
              <DownOutlined className="team-manage-nav-bar-left-dropdown-icon" />
            </div>
          </Dropdown>
        </Link>
      </div>
      <div className="team-manage-menu-body">
        <div className="team-manage-menu">
          <div className="team-manage-menu-content">
            <p className="team-manage-menu-substring">团队管理</p>
            <div className="team-manage-menu-items">
              {routers.map((item) => (
                <Link
                  to={`${item.path}?teamCode=${searchParams.get('teamCode')}`}
                  className={`team-manage-menu-item ${'/team/' + item.path === location.pathname ? 'team-manage-menu-item-active' : ''}`}
                  key={item.path}
                >
                  {item.icon}
                  <p className="team-manage-menu-item-text">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="team-manage-main">
          <div className="team-manage-main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamManage
