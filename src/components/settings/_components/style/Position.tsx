import './style/position.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import Row from '@/components/settings/_components/row/Row'
import { Select } from 'antd'
import {
  clearFloat,
  floatPosition,
  selectPosition
} from '@/components/settings/_components/style/data/position'
import { InputNumber } from 'antd'
import Group from '@/components/settings/_components/group/Group'
import { useStyleCollect } from '@/hooks/use-style-collect.ts'
import { StyleEnum } from '@/components/settings/_components/_types/styleEnum'

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
