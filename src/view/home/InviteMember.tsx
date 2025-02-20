import {
  Avatar,
  Button,
  Empty,
  Input,
  message,
  Modal,
  Select,
  Space,
  Tree,
  TreeDataNode
} from 'antd'
import { CloseOutlined, LeftOutlined } from '@ant-design/icons'
import { useState } from 'react'
import IconUserFilled from '@/assets/icon/icon-userFilled.svg'
import IconUserPermissionFilled from '@/assets/icon/icon-userPermissionFilled.svg'
import { inviteAddMember } from '@/api/team.ts'

const teamInvitePermissionData = [
  {
    icon: IconUserFilled,
    name: '仅加入团队，暂时不分配项目权限'
  },
  {
    icon: IconUserPermissionFilled,
    name: '加入团队，并获得部分项目权限'
  }
]

interface InviteMemberProps {
  teamCode: string
  visible: boolean
  temInvitePermissionTree: TreeDataNode[]
  onCancel: () => void
  onOk: () => void
}

const InviteMember = ({
  temInvitePermissionTree,
  teamCode,
  visible,
  onCancel,
  onOk
}: InviteMemberProps) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [teamInviteProjectPermission, setTeamInviteProjectPermission] =
    useState<any>([])
  // 邀请团队成员状态
  const [inviteTeamMember, setInviteTeamMember] = useState(false)
  // 邀请分配权限状态
  const [teamInvitePermission, setTeamInvitePermission] = useState<number>(0)
  // 邀请表单
  const [teamInviteForm, setTeamInviteForm] = useState({})
  // 成员名称
  const [memberName, setMemberName] = useState('')
  // 成员列表
  const [memberList, setMemberList] = useState<string[]>([])

  const handleAddMember = () => {
    if (!memberName) return
    setMemberList([...memberList, memberName])
    setMemberName('')
  }

  const handleCopyLink = async () => {
    const { inviteCode } = await inviteAddMember<{ inviteCode: string }>({
      teamCode,
      projectCodes: teamInviteProjectPermission.filter(
        (item: string | number) => item !== 0
      )
    })
    const textarea = document.createElement('textarea')
    textarea.style.position = 'fixed'
    textarea.style.opacity = String(0)
    textarea.value = `${location.host}/invite-confirm?code=${inviteCode}`
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    await messageApi.success('复制成功')
  }

  const handleCancel = () => {
    onCancel()
  }

  const handleOk = () => {
    onOk()
  }

  return (
    <>
      <Modal
        title={
          <p>
            {inviteTeamMember ? (
              <Space>
                <div
                  className="team-invite-modal-title"
                  onClick={() => setInviteTeamMember(false)}
                >
                  <LeftOutlined />
                </div>
                <p>邀请团队成员</p>
              </Space>
            ) : (
              <span>邀请成员</span>
            )}
          </p>
        }
        open={visible}
        footer={null}
        onCancel={onCancel}
      >
        <div className="team-invite-modal">
          {inviteTeamMember ? (
            <div className="team-invite-member">
              <div className="team-invite-member-search">
                <Input
                  placeholder="通过手机、邮箱邀请团队外成员加入团队"
                  className="team-invite-member-search-input"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
                <Button type="primary" onClick={handleAddMember}>
                  添加
                </Button>
              </div>
              <div className="team-invite-member-context">
                {memberList.length === 0 ? (
                  <Empty description={false} style={{ marginTop: 100 }} />
                ) : (
                  <div className="team-invite-member-items">
                    {memberList.map((item, index) => (
                      <div className="team-invite-member-item" key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            className="team-invite-member-item-avatar"
                            style={{
                              backgroundColor: '#f56a00',
                              verticalAlign: 'middle'
                            }}
                            size="large"
                          >
                            {item}
                          </Avatar>
                          <p className="team-invite-member-item-name">{item}</p>
                        </div>
                        <div
                          className="team-invite-member-item-close"
                          onClick={() =>
                            setMemberList(
                              memberList.filter((_, i) => index !== i)
                            )
                          }
                        >
                          <CloseOutlined />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="team-invite-member-footer">
                <Space>
                  <Button onClick={handleCancel}>取消</Button>
                  <Button onClick={handleOk} type="primary">
                    邀请{memberList.length}人
                  </Button>
                </Space>
              </div>
            </div>
          ) : (
            <>
              <div className="team-invite-head">
                <p className="team-invite-tips">
                  邀请加入此团队，并为其分配权限
                </p>
                <div className="team-invite-radio-group">
                  {teamInvitePermissionData.map((item, index) => (
                    <div
                      key={index}
                      className={`team-invite-radio ${index === teamInvitePermission ? 'team-invite-radio-active' : ''}`}
                      onClick={() => setTeamInvitePermission(index)}
                    >
                      <img
                        src={item.icon}
                        className="team-invite-radio-icon"
                        alt="icon"
                      />
                      <p className="team-invite-radio-text">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {teamInvitePermission === 1 && (
                <div className="team-invite-select-project">
                  <Tree
                    checkable
                    treeData={temInvitePermissionTree}
                    expandedKeys={[0]}
                    blockNode={true}
                    onCheck={(checkedKeys) =>
                      setTeamInviteProjectPermission(checkedKeys)
                    }
                  />
                </div>
              )}

              <div className="team-invite-body">
                <p className="team-invite-body-tips">通过链接邀请</p>
                <div className="team-invite-body-context">
                  <Select
                    className="team-invite-body-select"
                    defaultValue={2}
                    options={
                      teamInvitePermission === 0
                        ? [
                            {
                              value: 2,
                              label: '邀请外部人员加入团队后，成为 团队成员'
                            },
                            {
                              value: 1,
                              label: '邀请外部人员加入团队后，成为 管理员'
                            }
                          ]
                        : [
                            {
                              value: 2,
                              label: '获得链接的人加入以上项目,可查看'
                            },
                            {
                              value: 1,
                              label: '获得链接的人加入以上项目,可编辑'
                            },
                            {
                              value: 2,
                              label: '获得链接的人加入以上项目,可管理'
                            }
                          ]
                    }
                  />
                  <Button type="primary" onClick={handleCopyLink}>
                    复制链接
                  </Button>
                </div>
              </div>
              <div className="team-invite-footer">
                <p className="team-invite-footer-tips">通过链接邀请</p>
                <div
                  className="team-invite-footer-trigger"
                  onClick={() => setInviteTeamMember(true)}
                >
                  通过手机、邮箱邀请团队外部成员加入团队
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
      {contextHolder}
    </>
  )
}

export default InviteMember
