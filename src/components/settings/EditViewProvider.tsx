import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import Style from './_components/style/Style.tsx'
import Senior from './_components/senior/Senior.tsx'
import Event from './_components/event/Event.tsx'
import componentMap from './index.ts'
import React from 'react'

export class EditViewProvider {
  static of(
    item: PaneItemType,
    type: EditableTypeItem
  ): React.ReactElement | null {
    if (type === 'style' && item.editableType.includes('style'))
      return <Style />
    if (type === 'event' && item.editableType.includes('event'))
      return <Event data={item} />
    if (type === 'senior') return <Senior />
    const Component = (componentMap as { [key: string]: any })[item.type]
    return Component.of(item, type)
  }
}
