import { request } from '@/util/request'

// 查询团队列表
export const queryTeamList = <T>(): Promise<T> => request.get('/team/list')

// 查询团队成员
export const queryTeamMembers = <T>(teamCode: string): Promise<T> =>
  request.get(`/team/members/list?teamCode=${teamCode}`)

// 查询团队信息
export const queryTeamDetail = <T>(teamCode: string): Promise<T> =>
  request.get(`/team/teamSingle?teamCode=${teamCode}`)

// 查询团队邀请信息
export const queryTeamInviteInfo = <T>(code: string): Promise<T> =>
  request.get(`/team/invite/info?code=${code}`)

// 创建团队
export const createTeam = <T>({ teamName }: { teamName: string }): Promise<T> =>
  request.post('/team/create', { teamName })

// 邀请成员加入
export const inviteAddMember = <T>(data: {
  teamCode: string
  projectCodes: string[]
}): Promise<T> => request.post('/team/invite/member', data)

// 接受邀请
export const acceptInvite = (code: string) =>
  request.post('/team/invite/accept', { code })

// 修改团队名称
type UpdateTeamNameProps = {
  teamName: string
  teamCode: string
}
export const updateTeamName = (data: UpdateTeamNameProps) =>
  request.put('/team/update/teamName', data)

// 修改团队成员角色
export type UpdateTeamMemberRoleProps = {
  teamCode: string
  userCode: string
  permission: number
}
export const updateTeamMemberRole = (data: UpdateTeamMemberRoleProps) =>
  request.put('/team/update/member/role', data)
