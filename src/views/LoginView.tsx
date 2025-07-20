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

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const verContraseña = () => setMostrarPassword(!mostrarPassword)

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      navigate('/admin')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <h1 className='text-4xl text-white font-bold'>Iniciar Sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
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
          <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
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

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value='Iniciar Sesión'
        />
      </form>


      <nav className='mt-10'>
        <Link
          className='text-center text-white text-lg block'
          to="/auth/register"
        >¿No tienes cuenta? Crea una aquí</Link>
      </nav>
    </>
  )
}
