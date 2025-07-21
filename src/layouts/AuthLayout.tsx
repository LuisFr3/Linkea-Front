import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Logo from '../components/Logo'

export default function AuthLayout() {
  return (
    <>
      <div
        className="relative h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("/gif1.gif")' }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="animate-fade-up w-full max-w-md space-y-8">
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  )
}
