import './index.scss'
import LoginIcon from '@/assets/icon/login-icon.png'
import { Checkbox, Form, Input, message, Modal } from 'antd'
import IconUser from '@/assets/icon/icon-user.png'
import IconPassword from '@/assets/icon/icon-password.png'
import { useEffect, useState } from 'react'
import { login } from '@/api/login'
import { TOKEN } from '@/constant/util'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [loginFormRef] = Form.useForm()
  const [form, SetForm] = useState({ username: 'admin', password: '123456' })
  const handleLogin = async () => {
    await loginFormRef.validateFields()
    const { token } = await login<{ token: string }>(form)
    if (!token) return
    localStorage.setItem(TOKEN, token)
    message.success('登录成功')
    navigate('/', { replace: true })
  }

  useEffect(() => {
    // 处理未登录情况直接跳转需要授权页面而出现的弹窗
    Modal.destroyAll()
  }, [])

  return (
    <div className="login-container">
      <div className="login-left">
        <p className="name">FlowCode</p>
        <div className="login-left-center">
          <p className="title">可视化低代码平台</p>
          <p className="subtitle">快速构建现代化应用，释放创造力</p>
          <div className="items">
            <div className="item">
              <p className="count">1000+</p>
              <p className="text">组件模板</p>
            </div>
            <div className="item">
              <p className="count">50万+</p>
              <p className="text">开发者</p>
            </div>
            <div className="item">
              <p className="count">99.9%</p>
              <p className="text">服务可用性</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login">
          <div className="login-top">
            <img
              src={LoginIcon}
              alt="icon"
              className="login-top-icon"
              width={32}
            />
            <p className="login-top-text">专业低代码平台</p>
          </div>
          <p className="login-hello-title">欢迎登录</p>
          <p className="login-hello-text">
            欢迎使用 FlowCode 低代码平台，让开发更简单高效
          </p>

          <Form
            form={loginFormRef}
            layout="vertical"
            requiredMark={false}
            initialValues={form}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input
                className="login-form-item-input"
                placeholder="请输入账号/手机号/邮箱"
                prefix={<img src={IconUser} alt="user" />}
                onChange={(e) => SetForm({ ...form, username: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="账号"
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input
                type="password"
                className="login-form-item-input"
                placeholder="请输入密码"
                prefix={<img src={IconPassword} alt="paddword" />}
                onChange={(e) => SetForm({ ...form, password: e.target.value })}
              />
            </Form.Item>
          </Form>

          <div className="login-tools">
            <div className="login-remember">
              <Checkbox>记住我</Checkbox>
            </div>
            <p className="login-forgot">忘记密码？</p>
          </div>

          <button className="login-button" onClick={handleLogin}>
            登录
          </button>

          <div className="login-decorate-dot-top-left"></div>
          <div className="login-decorate-dot-top-right"></div>
          <div className="login-decorate-dot-bottom-left"></div>
          <div className="login-decorate-dot-bottom-right"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
