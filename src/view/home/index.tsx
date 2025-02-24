import {
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Tooltip,
  TreeDataNode
} from 'antd'
import { useEffect, useState } from 'react'
import './index.scss'
import IconMessage from '@/assets/icon/icon-message.png'
import IconSearch from '@/assets/icon/icon-search.png'
import DefaultAvatar from '@/assets/image/default-avatar.png'
import EmptyImage from '@/assets/image/empty.png'
import {
  DeleteOutlined,
  FolderOutlined,
  HomeOutlined,
  MoreOutlined,
  PlusOutlined,
  SettingOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { createTeam, queryTeamList } from '@/api/team.ts'
import { ProjectItem, TeamItem } from './_type'
import { createProject, queryProjectList } from '@/api/project'
import { LAST_LOAD_PROJECT_CODE } from '@/constant/project'
import { projectActions } from './project-actions'
import InviteMember from '@/view/home/InviteMember.tsx'

const defaultTeamForm = {
  teamName: ''
}

const defaultProjectForm = {
  teamCode: '',
  projectName: ''
}
const Home = () => {
  const navigator = useNavigate()
  const [teamFormInstance] = Form.useForm()
  const [projectFormInstance] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  // 当前选中的团队code
  const [currentTeam, setCurrentTeam] = useState('')
  // 当前选中项目code
  const [currentProject, setCurrentProject] = useState('')
  // 项目列表
  const [projectList, setProjectList] = useState<ProjectItem[]>([])
  // 项目可选树
  const [temInvitePermissionTree, setTemInvitePermissionTree] = useState<
    TreeDataNode[]
  >([])
  // 团队列表
  const [teamList, setTeamList] = useState<TeamItem[]>([])
  // 团队 modal
  const [visibleTeam, setVisibleTeam] = useState(false)
  // 项目 modal
  const [visibleProject, setVisibleProject] = useState(false)
  // 团队表单
  const [teamForm, setTeamForm] = useState({ ...defaultTeamForm })
  // 项目表单
  const [projectForm, setProjectForm] = useState({ ...defaultProjectForm })
  // 邀请弹窗
  const [teamInviteVisible, setTeamInviteVisible] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      await init()
    })()
    return () => {}
  }, [])

  const init = async () => {
    const teamList = await queryTeamList<TeamItem[]>()
    await getProjectList(teamList[0].teamCode)
    const currentTeamCode =
      localStorage.getItem(LAST_LOAD_PROJECT_CODE) || teamList[0].teamCode
    setCurrentTeam(currentTeamCode)
    setTeamList(teamList)
  }

  const getProjectList = async (teamCode: string) => {
    const projectList = await queryProjectList<ProjectItem[]>(teamCode)

    const tree = [
      {
        title: <p>全部项目</p>,
        key: 0,
        children: projectList.map((item) => ({
          title: item.projectName,
          key: item.code
        }))
      }
    ]
    setTemInvitePermissionTree(tree)
    setProjectList(projectList)
  }

  const handleAddOrEdit = () => {
    setVisibleTeam(true)
  }
  const handleTeamOk = async () => {
    await teamFormInstance.validateFields()
    await createTeam(teamForm)
    messageApi.success('创建成功')
    await init()
    resetTeamForm()
  }
  const resetTeamForm = () => {
    setVisibleTeam(false)
    setTeamForm({ ...defaultTeamForm })
  }

  const handleProjectOk = async () => {
    await projectFormInstance.validateFields()
    await createProject({
      ...projectForm,
      teamCode: currentTeam
    })
    messageApi.success('创建成功')
    await init()
    resetProjectForm()
  }

  const resetProjectForm = () => {
    setVisibleProject(false)
    setProjectForm({ ...defaultProjectForm })
  }

  const handleProjectChange = (e: any, code: string) => {
    e.domEvent.stopPropagation()
    switch (e.key) {
      case '1':
        window.open(`/project-manage?projectCode=${code}`)
        return
      case '2':
        console.log(currentProject)
    }
  }

  return (
    <div className="project-page-container">
      {/*  导航栏 */}
      <div className="project-page-navbar">
        <div className="project-page-navbar-right">
          <Input
            className="project-page-navbar-input"
            placeholder="搜索项目"
            prefix={
              <img
                src={IconSearch}
                width={16}
                style={{ marginRight: 6 }}
                alt="search"
              />
            }
          />
          <div className="project-page-navbar-message">
            <img src={IconMessage} alt="icon" width={14} />
          </div>
          <img src={DefaultAvatar} alt="avatar" width={40} />
        </div>
      </div>
      {/*  主体内容  */}
      <div className="project-page-body">
        <div className="project-page-left">
          {/*  菜单  */}
          <div className="project-page-menu">
            <Link to="/" className="project-page-menu-item">
              <HomeOutlined className="project-page-menu-item-icon" />
              <p className="project-page-menu-item-name">主页</p>
            </Link>
            <Link to="/resource" className="project-page-menu-item">
              <FolderOutlined className="project-page-menu-item-icon" />
              <p className="project-page-menu-item-name">团队资源</p>
            </Link>
            <Link
              to={`/team/member?teamCode=${currentTeam}`}
              className="project-page-menu-item"
            >
              <SettingOutlined className="project-page-menu-item-icon" />
              <p className="project-page-menu-item-name">团队管理</p>
            </Link>
            <Link to="/recycle-bin" className="project-page-menu-item">
              <DeleteOutlined className="project-page-menu-item-icon" />
              <p className="project-page-menu-item-name">回收站</p>
            </Link>
          </div>
          {/*  团队  */}
          <div className="project-page-team">
            <div className="project-page-team-head">
              <div className="project-page-team-dropdown-slot">
                <p className="project-page-team-title">团队列表</p>
              </div>

              <div className="project-page-team-actions">
                <Tooltip placement="bottom" title="邀请成员">
                  <UserAddOutlined
                    className="project-page-team-action"
                    onClick={() => setTeamInviteVisible(true)}
                  />
                </Tooltip>
                <Tooltip placement="bottom" title="新建项目">
                  <PlusOutlined
                    className="project-page-team-action"
                    onClick={() => setVisibleProject(true)}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="project-page-team-items">
              {teamList.map((item) => (
                <div className={`project-page-team-item`} key={item.teamCode}>
                  <p className="project-page-team-item-title">
                    {item.teamName}
                  </p>
                </div>
              ))}
              <div
                className="project-page-team-create"
                onClick={handleAddOrEdit}
              >
                <PlusOutlined className="project-page-team-create-icon" />
                <p className="project-page-team-create-text">新建团队</p>
              </div>
            </div>
          </div>
        </div>
        <div className="project-page-right">
          <div className="project-page-main">
            <div className="project-page-main-content">
              {projectList.map((item) => (
                <div
                  className="project-page-item"
                  key={item.code}
                  onClick={() =>
                    navigator(`/project-manage?projectCode=${item.code}`)
                  }
                >
                  <div className="project-page-item-image-wrapper">
                    <img
                      src={item.coverImage || EmptyImage}
                      alt="封面"
                      className="project-page-item-image"
                    />
                  </div>

                  <div className="project-page-item-details">
                    <p className="project-page-item-title">
                      {item.projectName}
                    </p>
                    <div className="project-page-item-footer">
                      <p className="project-page-item-update-time">
                        {item.updateTime}
                      </p>
                      <Dropdown
                        trigger={['click']}
                        menu={{
                          items: projectActions,
                          onClick: (e) => handleProjectChange(e, item.code)
                        }}
                        onOpenChange={() => setCurrentProject(item.code)}
                      >
                        <MoreOutlined
                          onClick={(e) => e.stopPropagation()}
                          className="project-page-item-actions"
                        />
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="新增团队"
        open={visibleTeam}
        cancelText="取消"
        okText="新增"
        onOk={handleTeamOk}
        onCancel={resetTeamForm}
      >
        <Form form={teamFormInstance} initialValues={teamForm}>
          <Form.Item
            label="团队名称"
            name="teamName"
            rules={[{ required: true, message: '团队名称不能为空' }]}
          >
            <Input
              placeholder="请输入团队名称"
              value={teamForm.teamName}
              onChange={(e) => setTeamForm({ teamName: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="新增项目"
        open={visibleProject}
        cancelText="取消"
        okText="新增"
        onOk={handleProjectOk}
        onCancel={resetProjectForm}
      >
        <Form form={projectFormInstance} initialValues={projectForm}>
          <Form.Item
            label="项目名称"
            name="projectName"
            rules={[{ required: true, message: '项目名称不能为空' }]}
          >
            <Input
              placeholder="请输入项目名称"
              value={projectForm.projectName}
              onChange={(e) =>
                setProjectForm({ ...projectForm, projectName: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <InviteMember
        teamCode={currentTeam}
        onOk={() => {}}
        onCancel={() => setTeamInviteVisible(false)}
        temInvitePermissionTree={temInvitePermissionTree}
        visible={teamInviteVisible}
      />
      {contextHolder}
    </div>
  )
}

export default Home
