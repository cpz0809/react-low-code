import './index.scss'
import Board from '@/components/board/Board.tsx'
import Header from '@/components/header/Header.tsx'
import { getPrefixCls } from '@/util/global-config'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { queryComponentList, saveComponent } from '@/api/component'
import { message, Spin } from 'antd'
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
import { isObject } from '@/util/is.ts'
import componentLibrary from '@/config/library/component.ts'

const BoardView = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [messageApi, contextHolder] = message.useMessage()
  const component = useSelector((state: RootState) => state.dragSplice.itemList)

  const [spinTips, setSpinTips] = useState('加载中')
  const [spinning, setSpinning] = useState(false)

  const pageCode = searchParams.get('pageCode') as string

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
    await getApiList()
    await getVariableList()
    await getComponentsList()
  }

  const getComponentsList = async () => {
    const data = await queryComponentList<any[]>(
      searchParams.get('pageCode') as string
    )
    // 根据type类型转换值 0静态变量 1接口变量 2接口数据
    const queryLoopDataByCode = (loop: { type: number; value: string }) => {
      if (!loop) return null
      const { stateData } = store.getState().contextSlice
      if (loop.type === 0) return loop
      if (loop.type === 1)
        return {
          ...stateData.find((item) => item.code === loop.value),
          category: 1
        }
      // 接口数据需要执行对应的函数
      // if (loop.type === 2) {
      // }
    }
    if (data.length === 0) return
    const map = data.map((item) => ({
      ...item,
      ...(typeMapConfig as any)[item.type],
      style: JSON.parse(item.style),
      attr: JSON.parse(item.attribute),
      loop: queryLoopDataByCode(item.loop),
      children: [],
      categoryType: Object.values(componentLibrary).find(
        (component) => component.type === item.type
      )?.categoryType
    }))
    dispatch(setItemList(map as any))
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
    const dataTypeChangeNewData = (
      loop: any[] | { source: string; code: string } | null
    ) => {
      if (!loop) return null
      if (Array.isArray(loop)) return { type: 0, value: loop }
      if (isObject(loop))
        return {
          type: loop.source === 'variable' ? 1 : 2,
          value: loop.code
        }
      return null
    }
    const map = component.map((item) => ({
      ...item,
      pageCode,
      style: JSON.stringify(item.style),
      attribute: JSON.stringify(item.attr),
      loop: dataTypeChangeNewData(item.loop as any)
    }))
    await saveComponent(map)
    setSpinning(false)
    messageApi.success('操作成功')
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
