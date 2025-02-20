import './styles/members.scss'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  queryTeamMembers,
  updateTeamMemberRole,
  UpdateTeamMemberRoleProps
} from '@/api/team.ts'
import { useSearchParams } from 'react-router-dom'
import { MemBerItem } from '@/view/team-manage/_types.ts'
import ImageDefaultAvatar from '@/assets/image/default-avatar.png'

const defaultTeamMemberForm: UpdateTeamMemberRoleProps = {
  teamCode: '',
  userCode: '',
  permission: 2
}

const Members = () => {
  const [teamMemberFormInstance] = Form.useForm()
  const [searchParams] = useSearchParams()
  const [messageApi, contextHolder] = message.useMessage()
  const [list, setList] = useState<MemBerItem[]>([])
  const [visible, setVisible] = useState(false)
  const [teamMemberForm, setTeamMemberForm] =
    useState<UpdateTeamMemberRoleProps>({
      ...defaultTeamMemberForm
    })

  const columns = [
    {
      title: '用户名称',
      dataIndex: 'nikeName'
    },
    {
      title: '头像',
      dataIndex: 'nikeName',
      render: () => {
        return <img src={ImageDefaultAvatar} alt="avatar" width={50} />
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      render: (email: string) => {
        return email ?? '-'
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      render: (mobile: string) => {
        return mobile ?? '-'
      }
    },
    {
      title: '角色',
      dataIndex: 'permission',
      render: (permission: number) => {
        return (
          <p>
            {permission === 0 && '超级管理员'}
            {permission === 1 && '管理员'}
            {permission === 2 && '成员'}
          </p>
        )
      }
    },
    {
      title: '操作',
      render: (row: any) => {
        return (
          <Button
            type="primary"
            onClick={() => handleTeamMember(row)}
            disabled={row.permission === 0}
          >
            修改
          </Button>
        )
      }
    }
  ]

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      await init()
    })()
  }, [])

  const init = async () => {
    const res = await queryTeamMembers<MemBerItem[]>(
      searchParams.get('teamCode') as string
    )
    setList(res)
  }

  const handleTeamMember = (row: any) => {
    setTeamMemberForm({
      teamCode: searchParams.get('teamCode') as string,
      userCode: row.userCode,
      permission: row.permission
    })
    setVisible(true)
  }

  const handleOk = async () => {
    await teamMemberFormInstance.validateFields()
    await updateTeamMemberRole(teamMemberForm)
    await init()
    setVisible(false)
    messageApi.success("修改成功")
  }

  const handleCancel = () => {
    setTeamMemberForm(defaultTeamMemberForm)
    setVisible(false)
  }
  return (
    <>
      <div className="members-header">
        <Form layout="inline">
          {/*<Form.Item label="用户组">*/}
          {/*  <Select*/}
          {/*    style={{ width: 140 }}*/}
          {/*    options={[*/}
          {/*      { value: '', label: 'Jack' },*/}
          {/*      { value: 'lucy', label: 'Lucy' },*/}
          {/*      { value: 'Yiminghe', label: 'yiminghe' },*/}
          {/*      { value: 'disabled', label: 'Disabled' }*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
          <Form.Item>
            <Input placeholder="搜索成员" prefix={<SearchOutlined />} />
          </Form.Item>
        </Form>
        <Button type="primary">邀请成员</Button>
      </div>
      <Table dataSource={list} rowKey="userCode" columns={columns} />

      <Modal
        open={visible}
        title="修改团队成员"
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form initialValues={teamMemberForm} form={teamMemberFormInstance}>
          <Form.Item
            label="角色"
            name="permission"
            rules={[{ required: true, message: '角色不能为空' }]}
          >
            <Select
              onChange={(e) =>
                setTeamMemberForm({ ...teamMemberForm, permission: e })
              }
              options={[
                { value: 1, label: '管理员' },
                { value: 2, label: '成员' }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  )
}

export default Members
