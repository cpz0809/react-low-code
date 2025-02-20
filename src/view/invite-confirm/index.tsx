import './index.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ImageLogo from '@/assets/image/logo-svg.png'
import ImageTeamLogo from '@/assets/image/invite-confirm-logo.svg'
import { useEffect, useState } from 'react'
import { acceptInvite, queryTeamInviteInfo } from '@/api/team.ts'

interface TeamInfoType {
  code: string
  teamName: string
  createTime: string
  updateTime: string
}

const InviteConfirm = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [inviteInfo, setInviteInfo] = useState<TeamInfoType>({
    code: '',
    createTime: '',
    teamName: '',
    updateTime: ''
  })

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      navigate('/', { replace: true })
      return
    }
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      await init()
    })()
  }, [])

  const init = async () => {
    const data = await queryTeamInviteInfo<TeamInfoType>(
      searchParams.get('code') as string
    )
    setInviteInfo(data)
  }

  const handleAccept = async () => {
    await acceptInvite(searchParams.get('code') as string)
    navigate('/', { replace: true })
  }

  return (
    <div className="invite-confirm-container">
      <div className="invite-confirm-context">
        <img src={ImageLogo} alt="logo" className="invite-confirm-logo" />
        <img
          src={ImageTeamLogo}
          alt="team-logo"
          className="invite-confirm-logo-team-icon"
        />
        <p className="invite-confirm-team-name">{inviteInfo?.teamName}</p>
        <p className="invite-confirm-text">邀请你加入团队</p>
        <div className="invite-confirm-footer">
          <button className="invite-confirm-y" onClick={handleAccept}>
            确认
          </button>
          <button className="invite-confirm-n">取消</button>
        </div>
      </div>
    </div>
  )
}

export default InviteConfirm
