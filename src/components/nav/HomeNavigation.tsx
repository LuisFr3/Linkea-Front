import { Link } from 'react-router-dom'

export default function HomeNavigation() {
  return (
    <>
        <Link
    className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-br from-gray-800 to-gray-600 rounded-l-full hover:from-gray-700 hover:to-gray-500 transition-all duration-300"
            to='/auth/login'
        >Iniciar Sesión</Link>
    
        <Link
    className="px-6 py-2 text-sm font-semibold text-gray-900 bg-gradient-to-br from-lime-300 to-lime-500 rounded-r-full hover:from-lime-200 hover:to-lime-400 transition-all duration-300"
            to='/auth/register'
        >Registrarme</Link>
    </>
  )
}
