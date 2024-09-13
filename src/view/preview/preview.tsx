import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import PreviewRender from './PreviewRender'

const Preview = () => {
  const contextData = useSelector((state: RootState) => state.contextSlice)
  const { itemList } = useSelector((state: RootState) => state.dragSplice)
  return <PreviewRender contextData={contextData} components={itemList} />
}

export default Preview
