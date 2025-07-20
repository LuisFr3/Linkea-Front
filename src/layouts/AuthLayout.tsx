import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Logo from '../components/Logo'

export default function AuthLayout() {
  return (
    <>
        <div className='bg-yellow-400 min-h-screen'>
            <div className='max-w-lg mx-auto pt-10 px-5'>

          <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">
              
                <Logo />
                <div className='py-10 w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
      </div>
        <Toaster position='top-right' />
    </>
  )
}
