"use client"

import { Link, useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { IoArrowBackOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import ErrorMessage from "../components/ErrorMessage"
import type { ResetPasswordForm } from "../types"
import { resetPassword } from "../api/AuthAPI"

export default function ResetPasswordView() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)

  const initialValues: ResetPasswordForm = {
    password: "",
    password_confirmation: "",
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  const password = watch("password")
  const verContraseña = () => setMostrarPassword(!mostrarPassword)

  // Verificar si existe el token existe
  useEffect(() => {
    if (!token) {
      toast.error("Token inválido")
      navigate("/auth/login")
    }
  }, [token, navigate])

  const mutation = useMutation({
    mutationFn: (formData: ResetPasswordForm) => resetPassword(token!, formData),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setPasswordReset(true)
    },
  })

  const handleResetPassword = (formData: ResetPasswordForm) => {
    mutation.mutate(formData)
  }

  // Lo que se mostrará cuando la contraseña se actualize correctamente
  if (passwordReset) {
    return (
      <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">
        <div className="bg-white px-6 py-8 rounded-xl shadow-lg space-y-6 w-full text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <IoCheckmarkCircleOutline className="w-8 h-8 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">¡Contraseña Actualizada!</h1>
            <p className="text-gray-600">Tu contraseña ha sido restablecida exitosamente.</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">Ya puedes iniciar sesión con tu nueva contraseña.</p>
          </div>

          <Link
            to="/auth/login"
            className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg text-sm font-semibold transition-colors inline-block"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="bg-white px-6 py-8 rounded-xl shadow-lg space-y-6 w-full"
        noValidate
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Nueva Contraseña</h1>
          <p className="text-sm text-gray-600">Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta</p>
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <div className="relative">
            <input
              id="password"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-400 w-full"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener mínimo 8 caracteres",
                },
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
              type={mostrarPassword ? "text" : "password"}
              placeholder="Confirmar nueva contraseña"
              className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-400 w-full"
              {...register("password_confirmation", {
                required: "Confirmar la contraseña es obligatorio",
                validate: (value) => value === password || "Las contraseñas no coinciden",
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

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white w-full py-3 rounded-lg text-sm font-semibold transition-colors"
        >
          {mutation.isPending ? "Actualizando..." : "Actualizar Contraseña"}
        </button>
      </form>

      <nav className="mt-6">
        <Link className="inline-flex items-center gap-2 text-white hover:text-gray-200" to="/auth/login">
          <IoArrowBackOutline className="w-4 h-4" />
          Volver al inicio de sesión
        </Link>
      </nav>
    </div>
  )
}
