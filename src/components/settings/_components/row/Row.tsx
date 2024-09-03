import { getPrefixCls } from '@/util/global-config.ts'
import './index.scss'
import React from 'react'

interface RowPropsType {
  title?: string
  children: React.ReactNode
}

const Row = ({ title, children }: RowPropsType) => {
  const prefixCls = getPrefixCls('row')
  return (
    <div className={`${prefixCls}-container`}>
      <p className="label-title">{title}</p>
      {children}
    </div>
  )
}

export default Row
