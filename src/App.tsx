import Board from '@/components/board/Board.tsx'
import Header from '@/components/header/Header.tsx'
import './styles/app.scss'
import { Provider } from 'react-redux'
import store from '@/store/index.ts'

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Board />
      </div>
    </Provider>
  )
}

export default App
