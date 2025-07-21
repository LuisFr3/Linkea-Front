import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import ErrorMessage from '../components/ErrorMessage'
import { LoginForm } from '../types'
import api from '../config/axios'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IoMailOutline } from "react-icons/io5"
import { useQueryClient } from '@tanstack/react-query';


export default function LoginView() {
  const navigate = useNavigate()
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const verContraseña = () => setMostrarPassword(!mostrarPassword)
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (formData: LoginForm) => {
  setIsLoading(true);
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)

    // Redirige directamente
    navigate('/admin');

    // Luego actualizas el usuario (sin esperar)
    queryClient.invalidateQueries({ queryKey: ['user'] });

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
  <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">    
      <form
        onSubmit={handleSubmit(handleLogin)}
      className="bg-white px-6 py-8 rounded-xl shadow-lg space-y-6 w-full"
        noValidate
      >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-gray-400">Ingresa tu correo y contraseña</p>
      </div>
        <div className="grid grid-cols-1 space-y-3">
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
      className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-400 w-full"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
           <IoMailOutline className="absolute right-3 top-3 w-5 h-5 text-slate-800" />
          </div>
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
            <div className="relative">

          <input
            id="password"
            type={mostrarPassword ? 'text' : 'password'}
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-400 w-full"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
            {mostrarPassword ? (
          <FaRegEye
            className="absolute right-3 top-3 w-5 h-5 text-slate-800 cursor-pointer"
            onClick={verContraseña}
          />
          ) : (
            <FaRegEyeSlash
              className="absolute right-3 top-3 w-5 h-5 text-slate-800 cursor-pointer"
              onClick={verContraseña}
            />
          )}
            </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white w-full py-2 rounded-md text-sm font-semibold transition"
      >
        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>

        
          <div className="text-center">
            <Link to="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>        
      </form>


      <nav className='mt-6'>
        <div>
          <span className="text-white">¿No tienes cuenta? </span>
          <Link className="text-lime-300 hover:text-lime-200 font-medium" to="/auth/register">
            Regístrate aquí
          </Link>
        </div>
      </nav>
      </div>
    </>
  )
}
