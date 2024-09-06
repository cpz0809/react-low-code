import { getPrefixCls } from '@/util/global-config.ts'
import './style/index.scss'
import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import Layout from '@/components/settings/_components/style/Layout'
import Position from '@/components/settings/_components/style/Position'
import Border from '@/components/settings/_components/style/Border'
import EditorCode from '@/components/settings/_components/monacoEditor/MonacoEditor'
import Font from './Font'
import Background from './Background'

const Style = () => {
  const prefixCls = getPrefixCls('edit-style-field')

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '布局',
      children: <Layout />
    },
    {
      key: '2',
      label: '文字',
      children: <Font />
    },
    {
      key: '3',
      label: '背景',
      children: <Background />
    },
    {
      key: '4',
      label: '位置',
      children: <Position />
    },
    {
      key: '5',
      label: '边框',
      children: <Border />
    }
  ]
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>行内样式</div>
      </div>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-code-edit-region`}>
          <EditorCode  />
        </div>
        <div className={`${prefixCls}-collapse`}>
          <Collapse size="small" items={items} />
        </div>
      </div>
    </div>
  )
}

export default Style
