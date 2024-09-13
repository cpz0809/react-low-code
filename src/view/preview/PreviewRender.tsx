import React, { Component } from 'react'
import { PreviewRenderProps } from './type'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import componentMap from './componentMap.tsx'
import { arrayToTree } from '@/util/node.ts'

class PreviewRender extends Component<PreviewRenderProps> {
  constructor(props: PreviewRenderProps) {
    super(props)
    const { contextData } = this.props
    const { stateData } = contextData

    const storeStateToClassState = () => {
      const entries = stateData.map((item) => [item.name, item.value])
      return Object.fromEntries(entries) as { [key: string]: any }
    }

    this.state = { ...storeStateToClassState() }
  }

  // 渲染节点
  finalViewProvider = (data: PaneItemType) => {
    const { attr, methods, style, uuid } = data
    const el = (componentMap as any)[data.type]
    // 元素字符串方法转可执行方法
    const mergeMethod = () => {
      if (!methods) return {}
      const method: { [key: string]: any } = {}
      Object.keys(methods).forEach((item) => {
        // 从设定好的函数中选择对应的函数并去掉空格
        const methodValue = this.props.contextData.methods[
          methods[item]
        ].replace(/\s/g, '')
        // handle[name](){...} => ... 只需要函数体
        const startIndex = methodValue.indexOf('{')
        const endIndex = methodValue.lastIndexOf('}')
        const contentInsideBraces = methodValue.substring(
          startIndex + 1,
          endIndex
        )
        method[item] = () => eval(contentInsideBraces)
      })
      return method
    }

    const handleAttr = () => {
      const temp = { ...attr }
      for (const key in temp) {
        const value = temp[key]
        if (typeof value !== 'object') continue
        if (value['source'] && value['uuid']) {
          const mapKey = this.props.contextData.stateData.find(
            (item) => item.code === value.uuid
          )?.name
          if (mapKey) {
            temp[key] = (this.state as any)[mapKey]
          }
        }
      }
      return temp
    }
    return React.cloneElement(
      el,
      {
        style,
        key: uuid,
        ...mergeMethod(),
        ...handleAttr()
      },
      ...data.children.map((com: any) => this.finalViewProvider(com))
    )
  }

  render() {
    return arrayToTree(this.props.components).map((item) =>
      this.finalViewProvider(item)
    )
  }
}

export default PreviewRender
