"use client"

import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { IoMailOutline, IoArrowBackOutline } from "react-icons/io5"
import ErrorMessage from "../components/ErrorMessage"
import type { ForgotPasswordForm } from "../types"
import { forgotPassword } from "../api/AuthAPI"
import { useState } from "react"

export default function ForgotPasswordView() {
  const [emailSent, setEmailSent] = useState(false)

  const initialValues: ForgotPasswordForm = {
    email: "",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: initialValues,
  })

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setEmailSent(true)
    },
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutation.mutate(formData)
  }

  if (emailSent) {
    return (
      <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">
        <div className="bg-white px-6 py-8 rounded-xl shadow-lg space-y-6 w-full text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <IoMailOutline className="w-8 h-8 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Email Enviado</h1>
            <p className="text-gray-600">Hemos enviado las instrucciones para restablecer tu contraseña a:</p>
            <p className="font-semibold text-gray-900">{getValues("email")}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Revisa tu bandeja de entrada</strong> y sigue las instrucciones del email. El enlace expirará en 1
              hora.
            </p>
          </div>

          <div className="space-y-3">
            <button onClick={() => setEmailSent(false)} className="text-cyan-600 hover:text-cyan-700 font-medium">
              ¿No recibiste el email? Intentar de nuevo
            </button>

            <div>
              <Link to="/auth/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
                <IoArrowBackOutline className="w-4 h-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up w-full flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="bg-white px-6 py-8 rounded-xl shadow-lg space-y-6 w-full"
        noValidate
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">¿Olvidaste tu contraseña?</h1>
          <p className="text-sm text-gray-600">Ingresa tu email y te enviaremos un link para restablecerla</p>
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              className="bg-slate-100 border-none p-3 pr-10 rounded-lg placeholder-slate-400 w-full"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email no válido",
                },
              })}
            />
            <IoMailOutline className="absolute right-3 top-3 w-5 h-5 text-slate-800" />
          </div>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white w-full py-3 rounded-lg text-sm font-semibold transition-colors"
        >
          {mutation.isPending ? "Enviando..." : "Enviar instrucciones"}
        </button>
      </form>

      <nav className="mt-6 text-center space-y-2">
        <Link className="inline-flex items-center gap-2 text-white hover:text-gray-200" to="/auth/login">
          <IoArrowBackOutline className="w-4 h-4" />
          Volver al inicio de sesión
        </Link>

        <div>
          <span className="text-white">¿No tienes cuenta? </span>
          <Link className="text-lime-300 hover:text-lime-200 font-medium" to="/auth/register">
            Regístrate aquí
          </Link>
        </div>
      </nav>
    </div>
  )
}
