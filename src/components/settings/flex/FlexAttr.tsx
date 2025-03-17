import { useAttrCollect } from '@/components/board/_hooks/use-attr-collect.ts'
import { PaneItemType } from '@/components/board/_types/util.ts'
import { FlexAttrEnum, FlexAttrType } from './type.ts'
import VariableBindingRow from '@/components/settings/_components/variable-binding-row/VariableBindingRow.tsx'
import Group from '@/components/settings/_components/group/Group.tsx'
import {
  alignOptions,
  gapOptions,
  justifyOptions,
  warpOptions
} from './config.ts'
import { Switch } from 'antd'

const FlexAttr = ({ data }: { data: PaneItemType<FlexAttrType> }) => {
  const { collect, mapValue } = useAttrCollect()
  const { vertical } = mapValue(data.attr)
  return (
    <div className="edit-custom-attr-content">
      <VariableBindingRow title="是否垂直" paramsKey={FlexAttrEnum.VERTICAL}>
        <Switch
          value={vertical}
          onChange={(e) => collect(FlexAttrEnum.VERTICAL, e)}
        />
      </VariableBindingRow>

      <VariableBindingRow title="换行方式" paramsKey={FlexAttrEnum.WRAP}>
        <Group
          data={warpOptions}
          onclick={(index) =>
            collect(FlexAttrEnum.WRAP, warpOptions[index].style)
          }
        />
      </VariableBindingRow>

      <VariableBindingRow title="主轴方向" paramsKey={FlexAttrEnum.JUSTIFY}>
        <Group
          data={justifyOptions}
          onclick={(index) =>
            collect(FlexAttrEnum.JUSTIFY, justifyOptions[index].style)
          }
        />
      </VariableBindingRow>

      <VariableBindingRow title="交叉轴方向" paramsKey={FlexAttrEnum.ALIGN}>
        <Group
          data={alignOptions}
          onclick={(index) =>
            collect(FlexAttrEnum.ALIGN, alignOptions[index].style)
          }
        />
      </VariableBindingRow>

      <VariableBindingRow title="间隙" paramsKey={FlexAttrEnum.GAP}>
        <Group
          data={gapOptions}
          onclick={(index) =>
            collect(FlexAttrEnum.GAP, gapOptions[index].style)
          }
        />
      </VariableBindingRow>
    </div>
  )
}

export default FlexAttr
