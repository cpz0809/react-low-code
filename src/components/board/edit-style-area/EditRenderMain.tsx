import { EditViewProvider } from '@/components/settings/EditViewProvider.tsx'
import { getPrefixCls } from '@/util/global-config.ts'
import './style/edit-render-main.scss'
import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { useAttrCollect } from '@/hooks/use-attr-collect'

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
