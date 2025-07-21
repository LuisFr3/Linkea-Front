import { useQueryClient } from '@tanstack/react-query'

export default function AdminNavigation() {
    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})
    }
    return (
        <button
  className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
}
