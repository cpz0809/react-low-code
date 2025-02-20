import { MenuProps } from 'antd'
import IconNewPage from '@/assets/icon/icon-newtab.svg'
import IconEdit from '@/assets/icon/icon-edit.svg'
import IconSetting from '@/assets/icon/icon-prjSetting.svg'
import IconShare from '@/assets/icon/icon-share.svg'
import IconLink from '@/assets/icon/icon-link.svg'
import IconMove from '@/assets/icon/icon-move.svg'
import IconTeam from '@/assets/icon/icon-team.svg'
import IconDelete from '@/assets/icon/icon-delete.svg'

export const projectActions: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="project-page-item-action">
        <img src={IconNewPage} alt="newPage" />
        <p>新标签页打开</p>
      </div>
    )
  },
  {
    key: '2',
    label: (
      <div className="project-page-item-action">
        <img src={IconEdit} alt="edit" />
        <p>重命名</p>
      </div>
    )
  },
  {
    key: '3',
    label: (
      <div className="project-page-item-action">
        <img src={IconSetting} alt="" />
        <p>项目设置</p>
      </div>
    )
  },
  {
    key: '4',
    label: (
      <div className="project-page-item-action">
        <img src={IconShare} alt="share" />
        <p>分享项目</p>
      </div>
    )
  },
  {
    key: '5',
    label: (
      <div className="project-page-item-action">
        <img src={IconLink} alt="link" />
        <p>复制链接</p>
      </div>
    )
  },
  {
    key: '6',
    label: (
      <div className="project-page-item-action">
        <img src={IconMove} alt="move" />
        <p>移动至文件夹</p>
      </div>
    )
  },
  {
    key: '7',
    label: (
      <div className="project-page-item-action">
        <img src={IconTeam} alt="team" />
        <p>移动至团队</p>
      </div>
    )
  },
  {
    key: '8',
    label: (
      <div className="project-page-item-action">
        <img src={IconDelete} alt="delete" />
        <p style={{ color: 'rgb(234, 79, 61)' }}>删除</p>
      </div>
    )
  }
]
