import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ForgotPasswordForm, ResetPasswordForm } from "../types"

/**
 * Solicita el reset de contraseña enviando un email al usuario
 * @param formData Objeto con el email del usuario
 * @returns Mensaje de confirmación
 */
export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post<{ message: string }>("/auth/forgot-password", formData)
    return data.message
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    throw new Error("Error al procesar la solicitud")
  }
}

/**
 * Restablece la contraseña del usuario usando el token
 * @param token Token de reset recibido por email
 * @param formData Objeto con la nueva contraseña
 * @returns Mensaje de confirmación
 */
export async function resetPassword(token: string, formData: ResetPasswordForm) {
  try {
    const { data } = await api.post<{ message: string }>(`/auth/reset-password/${token}`, formData)
    return data.message
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
    throw new Error("Error al restablecer la contraseña")
  }
}
