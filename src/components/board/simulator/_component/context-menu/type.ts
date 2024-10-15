import React from 'react'

export interface ContextMenuProps {
  copy: (e: React.MouseEvent<HTMLElement>) => void
  remove: () => void
}
