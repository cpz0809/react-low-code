import { EditOutlined } from '@ant-design/icons'
import './styles/setting.scss'
import IconTeam from '@/assets/icon/team.svg'
import { Button, Form, Input, InputRef, message, Modal, Switch } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { TeamItem } from '@/view/team-manage/_types.ts'
import { queryTeamDetail, updateTeamName } from '@/api/team.ts'
import { useSearchParams } from 'react-router-dom'

const defaultForm = {
  code: '',
  createTime: '',
  teamName: '',
  updateTime: ''
}

const Setting = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [searchParams] = useSearchParams()
  const [formInstance] = Form.useForm()
  const inputRef = useRef<InputRef>(null)
  const [teamDetail, setTeamDetail] = useState<TeamItem>({ ...defaultForm })
  const [visible, setVisible] = useState<boolean>(false)
  const [form, setForm] = useState<TeamItem>({ ...defaultForm })

  useEffect(() => {
    (async () => {
      await init()
    })()
  }, [])

  const init = async () => {
    const data = await queryTeamDetail<TeamItem>(
      searchParams.get('teamCode') as string
    )
    setTeamDetail(data)
  }

  const Action = (title: string, text: string, children: JSX.Element) => (
    <div className="setting-action">
      <div className="setting-action-left">
        <p className="setting-action-title">{title}</p>
        <p className="setting-action-text">{text}</p>
      </div>
      <div className="setting-action-right">{children}</div>
    </div>
  )
  const handleEditTeamName = () => {
    setForm(teamDetail)
    setVisible(true)
  }
  useEffect(() => {
    if (!visible || !inputRef.current) return
    inputRef.current.select()
  }, [visible])

  const handleOk = async () => {
    await formInstance.validateFields()
    await updateTeamName({ teamCode: form.code, teamName: form.teamName })
    await init()
    setVisible(false)
    messageApi.success('修改成功')
  }
  const handleCancel = () => {
    setForm(defaultForm)
    setVisible(false)
  }
  return (
    <>
      <div className="setting-container">
        <p className="setting-title">团队设置</p>
        <div className="setting-team-edit">
          <div className="setting-team-edit-icon">
            <img src={IconTeam} alt="team" />
          </div>
          <p className="setting-team-edit-name">{teamDetail.teamName}团队</p>
          <EditOutlined
            className="setting-team-edit-update"
            onClick={handleEditTeamName}
          />
        </div>

        <div className="setting-actions">
          {Action(
            '加入审核',
            '开启后，成员加入团队需要团队管理员或超管审核',
            <Switch />
          )}

          {Action(
            '移交团队',
            '每个团队只有 1 位所有者，移交后你将变为管理员',
            <Button type="primary">移交</Button>
          )}

          {Action(
            '合并团队',
            '合并后，团队成员和设计项目会自动合并到目标团队，请谨慎操作',
            <Button type="primary">合并</Button>
          )}

          {Action(
            '解散团队',
            '解散后，团队内所有内容都会被彻底删除不可恢复，请谨慎操作',
            <Button type="primary" danger>
              解散
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={visible}
        title="修改团队名称"
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={formInstance} initialValues={form}>
          <Form.Item
            label="团队名称"
            name="teamName"
            rules={[{ required: true, message: '团队名称不能为空' }]}
          >
            <Input
              ref={inputRef}
              placeholder="请输入团队名称"
              value={form.teamName}
              onChange={(e) => setForm({ ...form, teamName: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  )
}
export default Setting
