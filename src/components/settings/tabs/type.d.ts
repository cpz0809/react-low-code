export interface TabChildren {
  label: string
  children: ReactNode
}

export interface TabsAttrType {
  activeKey: string
  children: TabChildren[]
}
