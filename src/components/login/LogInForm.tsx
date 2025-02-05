"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"

import { signIn } from "next-auth/react";

import type { LoginValues, Log } from "@/types";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import LogMessage from "@/components/LogMessage";

export default function LogInForm() {
  const { register, handleSubmit, formState: {errors} } = useForm<LoginValues>()
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState<Log>({type: "", message: ""})
  const router = useRouter()

  const onSubmit = handleSubmit(async data => {
    setLog({
      type: "",
      message: ""
    })
    setLoading(true)

    const res = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
    })

    if(res?.error){
      setLog({
        type: "error",
        message: res.error
      })
      setLoading(false)
    }else{
      router.push("/dashboard")
      router.refresh()
    }
  })

  return (
    <form className="w-full max-w-96 flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className="text-center text-2xl font-bold">Iniciar Sesión</h1>

      <Input
        type="email"
        label="Correo Electrónico"
        isInvalid={errors.email && true}
        errorMessage={errors.email?.message}
        {...register("email", {
          required: {
            value: true,
            message: "El correo electrónico es obligatorio..."
          }
        })}
      />

      <Input
        type="password"
        label="Contraseña"
        isInvalid={errors.password && true}
        errorMessage={errors.password?.message}
        {...register("password", {
          required: {
            value: true,
            message: "La contraseña es obligatoria..."
          }
        })}
      />

      <Button
        size="sm"
        className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black flex"
        type="submit"
      >
        Iniciar Sesión
        {loading && (
          <CircularProgress size="sm" />
        )}
      </Button>

      {log.type && <LogMessage log={log} />}
    </form>
  );
}
