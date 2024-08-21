import './style/position.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import Row from '@/components/settings/util/row/Row.tsx'
import { Select } from 'antd'
import {
  clearFloat,
  floatPosition,
  selectPosition
} from '@/components/settings/util/style/data/position.ts'
import { InputNumber } from 'antd'
import Group from '@/components/settings/util/group/Group.tsx'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import { StyleEnum } from '@/components/settings/util/type/styleEnum.ts'

const Position = () => {
  const prefixCls = getPrefixCls('edit-style-position')
  const { collect, matchingStyle } = useStyleCollect()
  return (
    <div className={`${prefixCls}`}>
      <Row title="定位">
        <Select
          options={selectPosition}
          style={{ width: '100px' }}
          size="small"
          onChange={(e) => collect(e, StyleEnum.POSITION)}
        />
      </Row>
      <Row title="zIndex">
        <InputNumber
          size="small"
          placeholder={matchingStyle(StyleEnum.ZINDEX)}
          onChange={(e) => collect(e, StyleEnum.ZINDEX, '')}
        />
      </Row>
      <Row title="浮动方向">
        <Group data={floatPosition} />
      </Row>
      <Row title="清除浮动">
        <Group data={clearFloat} />
      </Row>
    </div>
  )
}

export default Position
