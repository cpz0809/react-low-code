import { EditViewProvider } from '@/components/settings/EditViewProvider.tsx'
import { getPrefixCls } from '@/util/global-config.ts'
import './style/edit-render-main.scss'
import { EditableTypeItem, PaneItemType } from '@/components/_types/util.ts'
import { useAttrCollect } from '@/components/_hooks/use-attr-collect.ts'

interface EditRenderMainProps {
  paneItem: PaneItemType
  type: EditableTypeItem
}

const EditRenderMain = ({ paneItem, type }: EditRenderMainProps) => {
  const prefixCls = getPrefixCls('edit-render-main')

  const { mapValue } = useAttrCollect()
  return (
    <div className={`${prefixCls}`}>
      {EditViewProvider.of(
        { ...paneItem, attr: mapValue(paneItem.attr) },
        type
      )}
    </div>
  )
}
export default EditRenderMain
