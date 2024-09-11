/* eslint-disable react-hooks/exhaustive-deps */
import './style/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '../_components/drawer/Drawer'
import { RootState } from '@/store'
import { setProgramVisible } from '@/store/modules/view'
import { getPrefixCls } from '@/util/global-config'
import MonacoEditor, { loader, OnMount } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useEffect, useRef, useState } from 'react'
import { analysisStr } from './_util/strAction'
import { StateSingleProps } from '@/store/_types/context'
import { addOrEditVariable, fullUpdate } from '@/store/modules/context'
import { findDataType } from '@/util/is'

const defaultStr = `class LowcodeComponent extends Component {\n  state = {\n  }\n}`

loader.config({ monaco })
const Program = () => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('program')
  const { stateData } = useSelector((state: RootState) => state.contextSlice)
  const { programVisible } = useSelector((state: RootState) => state.viewSplice)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [editorValue, setEditorValue] = useState(defaultStr)

  const handleEditorChange = (e: string | undefined) => {
    if (!e) return
    setEditorValue(e)
  }

  useEffect(() => {
    initState()
  }, [stateData])

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
    const value = analysisStr(editorRef.current.getValue())
    // 比对与store中stateData数据差异
    diffState(value)
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

  const compareTypeAndValue = (data: { key: string; value: any }) =>
    !stateData.find((item) => item.name === data.key)
  const initState = () => {
    const str = editorValue.replace(
      /state\s*=\s*\{([\s\S]+?)\}(?=\s*\}\s*$)/,
      `state = { ${generateState()} }`
    )
    setEditorValue(str)
  }

  const generateState = () =>
    stateData.reduce(
      (prev, cur, index) =>
        `${index === stateData.length - 1 ? `\n` : ''}    ${cur.name}:${JSON.stringify(cur.value)}${index > 0 ? ',\n' : ''}` +
        prev,
      ''
    )

  const handleClose = () => {
    dispatch(setProgramVisible())
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
