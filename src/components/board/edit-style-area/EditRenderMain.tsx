import { EditViewProvider } from '@/components/settings/EditViewProvider.tsx'
import { getPrefixCls } from '@/util/global-config.ts'
import './style/edit-render-main.scss'
import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

interface EditRenderMainProps {
  paneItem: PaneItemType
  type: EditableTypeItem
}

const EditRenderMain = ({ paneItem, type }: EditRenderMainProps) => {
  const prefixCls = getPrefixCls('edit-render-main')

  return (
    <div className={`${prefixCls}`}>{EditViewProvider.of(paneItem, type)}</div>
  )
}
export default EditRenderMain
