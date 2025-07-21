import { useQueryClient } from '@tanstack/react-query'

export default function AdminNavigation() {
    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})
    }
    return (
        <button
      className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors duration-200"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
}
