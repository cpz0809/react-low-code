import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TOKEN } from '@/constant/util.ts'

const Permission = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem(TOKEN)) {
      navigate('/login', { replace: true })
    }
  }, [location.pathname])

  return (
    <>
      <div></div>
      <Outlet />
    </>
  )
}

export default Permission
