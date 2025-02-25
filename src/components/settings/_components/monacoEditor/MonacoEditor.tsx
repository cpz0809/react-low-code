import './index.scss'
import MonacoEditor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { getPrefixCls } from '@/util/global-config.ts'
import IconCss from '@/assets/icon/icon-css.png'
import css from 'css'
import { useStyleCollect } from '@/components/_hooks/use-style-collect.ts'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { isEmptyObject } from '@/util/is.ts'
import { updateComponentStyle } from '@/api/component.ts'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') return new jsonWorker()
    if (label === 'css' || label === 'scss' || label === 'less')
      return new cssWorker()
    if (label === 'html' || label === 'handlebars' || label === 'razor')
      return new htmlWorker()
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

loader.config({ monaco })

const EditorCode = () => {
  const prefixCls = getPrefixCls('edit-style-field-region')

  const [messageApi, contextHolder] = message.useMessage()
  const { collect, clearStyle } = useStyleCollect()

  const { currentClick } = useSelector((state: RootState) => state.dragSplice)
  const [editorValue, setEditorValue] = useState(`.element {\n}`)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    if (!currentClick || !currentClick.style) return

    if (isEmptyObject(currentClick.style)) return

    let editorValue = ''
    for (const key in currentClick.style) {
      editorValue += `  ${key}: ${(currentClick.style as any)[key]};\n`
    }

    setEditorValue(`.element {\n${editorValue}}`)
  }
  const handleEditorChange = (e: string | undefined) => {
    if (!e) return
    try {
      const styleObject = parseStyle(e) as Record<string, any>
      Object.keys(styleObject).forEach((key: string) => {
        if (styleObject[key]) {
          const { value, unit } = styleObject[key]
          collect(value, key, unit)
        }
      })
    } catch {
      /* empty */
    }
    setEditorValue(e)
  }

  const handleSaveStyle = async () => {
    if (!currentClick) return
    const styleObject = parseStyle(editorValue)
    // 找出需要更新的属性
    const { diffObj, oldStyle } = diffStyle(currentClick.style, styleObject)
    await updateComponentStyle({
      uuid: currentClick.uuid,
      style: JSON.stringify(splicingStr({ ...oldStyle, ...diffObj }))
    })
    messageApi.success('保存成功')
  }

  /**
   * 将字符串解析成css ast
   * @param style
   */
  const parseStyle = (style: string) => {
    const ast = css.parse(style)
    const rule = ast.stylesheet?.rules[0]
    if (!rule || rule.type !== 'rule' || !rule.declarations) return
    if (rule.declarations.length === 0) return clearStyle()
    const styleObject: Record<string, any> = {}
    rule.declarations.forEach((declaration: any) => {
      styleObject[declaration.property] = splitStyle(declaration.value)
    })
    return styleObject
  }

  /**
   * 查找变化的style
   * @param old
   * @param newStyle
   */
  const diffStyle = (old: any, newStyle: any) => {
    const diffObj: Record<string, any> = {}
    const oldStyle: Record<string, any> = {}

    // 删除
    for (const key in old) {
      const item = splitStyle(old[key])
      if (!newStyle[key]) {
        diffObj[key] = { ...item, value: null }
        continue
      }
      oldStyle[key] = item
    }
    // 新增
    for (const key in newStyle) {
      if (!oldStyle[key]) {
        diffObj[key] = newStyle[key]
      } else {
        if (oldStyle[key].value !== newStyle[key].value) {
          diffObj[key] = newStyle[key]
        }
      }
    }
    return { oldStyle, diffObj }
  }

  const splicingStr = (obj: any) => {
    const temp: any = {}
    for (const key in obj) {
      if (!obj[key].value) continue
      temp[key] = `${obj[key].value}${obj[key].unit}`
    }
    return temp
  }

  /**
   * 字符串分割 100px 分割成{value,unit}
   * @param str
   */
  const splitStyle = (str: string) => {
    const match = str.match(/^(-?\d+(\.\d+)?)(px|%|em|rem|vh|vw)$/)

    if (match)
      return {
        value: Number(match[1]),
        unit: match[3]
      }
  }
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-tool`}>
        <img src={IconCss} alt="" width={22} height={22} />
        <Button type="primary" size="middle" onClick={handleSaveStyle}>
          保存
        </Button>
      </div>

      <div className={`${prefixCls}-edit`}>
        <MonacoEditor
          theme="vs"
          language="css"
          value={editorValue}
          options={{
            tabSize: 2
          }}
          onChange={handleEditorChange}
        />
      </div>
      {contextHolder}
    </div>
  )
}
export default EditorCode
