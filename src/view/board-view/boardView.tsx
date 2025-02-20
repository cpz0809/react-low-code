import './index.scss'
import Board from '@/components/board/Board.tsx'
import Header from '@/components/header/Header.tsx'
import { getPrefixCls } from '@/util/global-config'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { queryComponentList, saveComponent } from '@/api/component'
import { message, Spin } from 'antd'
import { arrayToTree } from '@/util/node'
import { PaneItemType } from '@/components/_types/util.ts'
import { setItemList } from '@/store/modules/drag'
import typeMapConfig from '@/config/library/typeMapConfig'
import { addApi, deleteApi, queryApiList, updateApi } from '@/api/api.ts'
import { ApiSingleProps, VariableSingleProps } from '@/store/_types/context.ts'
import {
  addVariable,
  deleteVariable,
  queryVariableList,
  updateVariable
} from '@/api/variable.ts'
import { setApiData, setVariableData } from '@/store/modules/context.ts'

const BoardView = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [messageApi, contextHolder] = message.useMessage()
  const context = useSelector((state: RootState) => state.contextSlice)
  const component = useSelector((state: RootState) => state.dragSplice.itemList)

  const [spinTips, setSpinTips] = useState('加载中')
  const [spinning, setSpinning] = useState(false)
  const [componentStore, setComponentStore] = useState<PaneItemType[]>([])

  const pageCode = searchParams.get('pageCode') as string

  useEffect(() => {
    // console.log(component)
  }, [component])

  useEffect(() => {
    ;(async () => {
      await init()
    })()
    return () => {
      window.removeEventListener('keydown', handleSave)
    }
  }, [])

  const init = async () => {
    bindingEvent()
    await initData()
  }

  const bindingEvent = () => {
    window.addEventListener('keydown', handleSave)
  }

  const initData = async () => {
    await getComponentsList()
    await getApiList()
    await getVariableList()
  }

  const getComponentsList = async () => {
    const data = await queryComponentList<any[]>(
      searchParams.get('pageCode') as string
    )
    if (data.length === 0) return
    const map = data.map((item) => ({
      ...item,
      ...(typeMapConfig as any)[item.type],
      style: JSON.parse(item.style),
      attr: JSON.parse(item.attribute),
      children: []
    }))
    dispatch(setItemList(map as any))
    // arrayToTree(data)
  }

  const getApiList = async () => {
    const res = await queryApiList<ApiSingleProps[]>(pageCode)
    dispatch(setApiData(res))
  }

  const getVariableList = async () => {
    const res = await queryVariableList<VariableSingleProps[]>(pageCode)
    dispatch(setVariableData(res))
  }

  // 快捷键保存
  const handleSave = (e: any) => {
    if (e.key === 's' && e.ctrlKey) {
      e.preventDefault()
      setSpinTips('保存中')
      setSpinning(true)
      onSave()
    }
  }

  const onSave = async () => {
    const map = component.map((item) => ({
      ...item,
      pageCode,
      style: JSON.stringify(item.style),
      attribute: JSON.stringify(item.attr)
    }))
    await saveComponent(map)
    setSpinning(false)
  }

  const handleApiSubmit = async (form: ApiSingleProps) => {
    if (form.code) {
      await updateApi({ ...form, pageCode })
    } else {
      await addApi({ ...form, pageCode })
    }
    await getApiList()
    messageApi.success('操作成功')
    return true
  }

  const handleApiRemove = async (codes: string[]) => {
    await deleteApi(codes)
    await getApiList()
    messageApi.success('操作成功')
    return true
  }

  const handleVariableSubmit = async (form: any) => {
    if (form.code) {
      await updateVariable({ ...form, pageCode })
    } else {
      await addVariable({ ...form, pageCode })
    }
    await getVariableList()
    messageApi.success('操作成功')
    return true
  }

  const handleVariableRemove = async (codes: string[]) => {
    await deleteVariable(codes)
    await getVariableList()
    messageApi.success('操作成功')
    return true
  }

  const prefixCls = getPrefixCls('board-view')

  return (
    <div className={`${prefixCls}`}>
      <Spin
        delay={100}
        spinning={spinning}
        percent="auto"
        fullscreen
        tip={<p>{spinTips}...</p>}
      />
      <Header onSave={onSave} />
      <Board
        onApiSubmit={handleApiSubmit}
        onApiRemove={handleApiRemove}
        onVariableSubmit={handleVariableSubmit}
        onVariableRemove={handleVariableRemove}
      />
      {contextHolder}
    </div>
  )
}

export default BoardView
