/* eslint-disable react-hooks/exhaustive-deps */
import './style/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '../_components/drawer/Drawer'
import { RootState } from '@/store'
import { setMenuVisible } from '@/store/modules/view'
import { getPrefixCls } from '@/util/global-config'
import MonacoEditor, { loader, OnMount } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useEffect, useRef, useState } from 'react'
import { analysisStr } from './_util/strAction'
import { StateSingleProps } from '@/store/_types/context'
import {
  addOrEditMethod,
  addOrEditVariable,
  fullUpdate
} from '@/store/modules/context'
import { findDataType } from '@/util/is'
import * as babelParser from '@babel/parser'

loader.config({ monaco })
const Program = () => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('program')
  const { stateData, methods } = useSelector(
    (state: RootState) => state.contextSlice
  )
  const { programVisible } = useSelector((state: RootState) => state.viewSplice)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [editorValue, setEditorValue] = useState('')

  const handleEditorChange = (e: string | undefined) => {
    if (!e) return
    setEditorValue(e)
  }

  useEffect(() => {
    initTemplate()
  }, [stateData, methods])

  const monacoEditorMount: OnMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    // 离开焦点
    editor.onDidBlurEditorText(monacoEditorDidBlurEditorText)
    editorRef.current = editor
  }
  const monacoEditorDidBlurEditorText = () => {
    if (!editorRef.current) return
    // 将字符串state中的内容取出
    const editorValue = editorRef.current.getValue()
    // 使用babel解析模板
    const ast = babelParser.parse(editorValue, {
      sourceType: 'module',
      plugins: [] // 支持类属性
    })
    traverse(editorValue, ast.program.body[0])
  }
  const traverse = (str: string, node: any) => {
    node.body.body.forEach((child: any) => {
      if (child.type === 'ClassProperty' && child.key.name === 'state') {
        // 获取state字符串
        const stateStr = str.substring(child.start, child.end)
        // 将前后{}去掉取出内容
        const jsonStr = stateStr.substring(
          stateStr.indexOf('{') + 1,
          stateStr.length - 1
        )
        // 转换成对象
        const value = analysisStr(jsonStr)
        // 比对与store中stateData数据差异
        diffState(value)
      } else if (child.type === 'ClassMethod') {
        const methodNama = child.key.name
        const methodContent = str.substring(child.start, child.end)
        diffMethod(methodNama, methodContent)
      }
    })
  }

  const diffState = (arr: { key: string; value: any }[] | null) => {
    if (!arr) return
    const newStateData = JSON.parse(JSON.stringify(stateData))
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      const isAdd = compareTypeAndValue(item)
      // 不是新增
      if (!isAdd) {
        const index = newStateData.findIndex(
          (el: StateSingleProps) => el.name === item.key
        )
        newStateData[index].value = item.value
      } else {
        dispatch(
          addOrEditVariable({
            type: 'state',
            data: {
              code: '',
              name: item.key,
              type: findDataType(item.value),
              value: item.value,
              illustrate: ''
            }
          })
        )
      }
    }
    dispatch(fullUpdate(newStateData))
  }

  const diffMethod = (name: string, content: string) => {
    if (
      !methods[name] ||
      methods[name].replace(/\s/g, '') !== content.replace(/\s/g, '')
    ) {
      dispatch(
        addOrEditMethod({
          name,
          value: content
        })
      )
    }
  }

  const compareTypeAndValue = (data: { key: string; value: any }) =>
    !stateData.find((item) => item.name === data.key)

  const initTemplate = () => {
    const code = `class LowcodeComponent extends Component {\n  state = {${generateState()}\n  }\n  ${generateMethod()}\n} `
    setEditorValue(code)
  }

  const generateState = () =>
    stateData.reduce(
      (prev, cur, index) =>
        `${index === stateData.length - 1 ? `\n` : ''}    ${cur.name}:${JSON.stringify(cur.value)}${index > 0 ? ',\n' : ''}` +
        prev,
      ''
    )
  const generateMethod = () => Object.values(methods).join('\n')

  const handleClose = () => {
    dispatch(setMenuVisible('programVisible'))
    if (!editorRef.current) return
  }

  return (
    <Drawer
      width={600}
      show={programVisible}
      title="源码面板"
      onclose={handleClose}
    >
      <div className={`${prefix}`}>
        <MonacoEditor
          value={editorValue}
          width={'100%'}
          height={'100%'}
          theme="vs"
          language="javascript"
          options={{
            readOnly: false,
            tabSize: 2,
            minimap: {
              enabled: false
            },
            automaticLayout: true
          }}
          onMount={monacoEditorMount}
          onChange={handleEditorChange}
        />
      </div>
    </Drawer>
  )
}

export default Program
