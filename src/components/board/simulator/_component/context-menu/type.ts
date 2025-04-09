import React from 'react'

export interface ContextMenuProps {
  copy: (e: React.MouseEvent<HTMLElement>) => void
  remove: () => void
}

export interface ChildrenMenuItem {
  label: string
  key: string
  onClick: (e: any) => void
}
