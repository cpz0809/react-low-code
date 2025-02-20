import { Modal } from 'antd'
import router from '@/router'

const AuthMethods = () => {
  Modal.destroyAll()
  Modal.confirm({
    title: '系统提示',
    content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
    okText: '重新登录',
    cancelText: '取消',
    async onOk() {
      await router.navigate('/login', { replace: true })
    }
  })
}

export default AuthMethods
