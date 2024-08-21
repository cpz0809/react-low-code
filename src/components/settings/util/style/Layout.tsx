import './style/layout.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import {
  distanceData,
  modeData
} from '@/components/settings/util/style/data/layout.ts'
import Row from '@/components/settings/util/row/Row.tsx'
import Group from '@/components/settings/util/group/Group.tsx'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import { StyleEnum } from '@/components/settings/util/type/styleEnum.ts'
import InputMergeSelect from '@/components/settings/util/input-merge-select/InputMergeSelect.tsx'

const Layout = () => {
  const prefixCls = getPrefixCls('edit-style-layout')
  const { matchingStyle } = useStyleCollect()
  const Input = (key: string) => {
    return (
      <div className="input-wrapper">
        <input type="text" maxLength={3} placeholder={matchingStyle(key)} />
      </div>
    )
  }

  return (
    <div className={`${prefixCls}`}>
      {/*  布局模式  */}
      <Row title="布局模式">
        <Group data={modeData} />
      </Row>
      {/*  边距  */}
      <div className={`${prefixCls}-distance`}>
        {distanceData.map((item) => {
          return (
            <div className={item.key} key={item.key}>
              {item.tips && <span>{item.tips}</span>}
              {Input(item.key)}
            </div>
          )
        })}
      </div>
      {/*  大小  */}
      <div className={`${prefixCls}-size`}>
        <Row title="宽度">
          <InputMergeSelect styleKey={StyleEnum.WIDTH} />
        </Row>
        <Row title="高度">
          <InputMergeSelect styleKey={StyleEnum.HEIGHT} />
        </Row>
      </div>
    </div>
  )
}

export default Layout
