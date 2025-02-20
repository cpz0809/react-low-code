import { Provider } from 'react-redux'
import store from '@/store/index.ts'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'
import { theme } from '@/config/ant-theme.ts'

function App() {
  return (
    <ConfigProvider theme={{ ...theme }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  )
}

export default App
