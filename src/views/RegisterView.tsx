import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import type { RegisterForm } from '../types'
import ErrorMessage from '../components/ErrorMessage'
import api from '../config/axios'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IoMailOutline } from "react-icons/io5"
import { FaUser, FaAt } from 'react-icons/fa'


export default function RegisterView() {
    const location = useLocation()
    const navigate = useNavigate()
    const initialValues : RegisterForm = {
        name: '',
        email: '',
        handle:  location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({defaultValues : initialValues})

    const password = watch('password')

    const [mostrarPassword, setMostrarPassword] = useState(false)
    const verContraseña = () => setMostrarPassword(!mostrarPassword)
    

    const handleRegister = async (formData : RegisterForm) => {
        try {
            const {data} = await api.post(`/auth/register`, formData)
            toast.success(data)
            reset()
            navigate('/auth/login')
        } catch (error) {
            if(isAxiosError(error) && error.response ) {
                toast.error(error.response.data.error)
            }
        }
    }


    return (
        <>
  <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">    
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-6 py-8 rounded-xl shadow-lg space-y-6 w-full"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-semibold">Crear cuenta</h1>
                </div>
                <div className="grid grid-cols-1 space-y-3">
                      <div className="relative">
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-600 w-full"
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                    />
                        <FaUser className="absolute right-3 top-3 w-5 h-5 text-slate-500" />
                    </div>                    
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                <div className="relative">
                    <input
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-600 w-full"
                        {...register('email', {
                            required: "El Email es obligatorio", 
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    <IoMailOutline className="absolute right-3 top-3 w-5 h-5 text-slate-800" />
                    </div>                    
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                      <div className="relative">
                    <input
                        id="handle"
                        type="text"
                        placeholder="Ingresa tu nombre de usuario (sin espacios)"
                        className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-600 w-full"
                        {...register('handle', {
                            required: "El Handle es obligatorio"
                        })}
                    />
                        <FaAt className="absolute right-3 top-3 w-5 h-5 text-slate-500" />
                    </div>                    
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                <div className="relative">
                    <input
                        id="password"
                        type={mostrarPassword ? 'text' : 'password'}
                        placeholder="Ingresa tu contraseña"
                        className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-600 w-full"
                        {...register('password', {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "El password debe ser mínimo de 8 caracteres"
                            }
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
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                <div className="relative">
                    <input
                        id="password_confirmation"
                        type={mostrarPassword ? 'text' : 'password'}
                        placeholder="Repetir contraseña"
                        className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-600 w-full"
                        {...register('password_confirmation', {
                            required: "Repetir Password es obligatorio",
                            validate: (value) => value === password || 'Los passwords no son iguales'
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
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md text-sm font-semibold transition"
                    value='Crear Cuenta'
                />
            </form>

            <nav className='mt-6'>
                <div>
                <span className="text-white">¿Ya tienes una cuenta? </span>
                <Link className="text-lime-300 hover:text-lime-200 font-medium" to="/auth/login">
                    Inicia Sesión
                </Link>
                </div>                
            </nav>
           </div>
        </>
    )
}
