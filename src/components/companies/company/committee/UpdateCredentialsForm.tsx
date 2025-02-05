"use client"

import { useForm } from "react-hook-form"
import { Button, Input } from "@nextui-org/react"

type UpdateCredentialsFormProps = {
  companyId: number
  getCredentials: (id: number) => Promise<void>
  credentials: {key: string, value: string}[]
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdateCredentialsForm({setEdit, companyId, getCredentials, credentials} : UpdateCredentialsFormProps) {
  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit(async data => {
    const res = await fetch(`/api/committee/update-committee?query=${companyId}`, {
      method: "PUT",
      body: JSON.stringify({
        inpsasel_email: data.inpsasel_email,
        inpsasel_password: data.inpsasel_password
      })
    })

    if(res.ok){ 
      getCredentials(companyId)
      setEdit(false)
    }
  })

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={onSubmit}
    >
      <Input
        type="email"
        size="sm"
        label="Correo INPSASEL"
        defaultValue={credentials[0].value}
        {...register("inpsasel_email", {required: true})}
      />

      <Input
        type="text"
        size="sm"
        label="Clave Web INPSASEL"
        defaultValue={credentials[1].value}
        {...register("inpsasel_password", {required: true})}
      />

      <Button 
        size="sm"
        className="w-full bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black"
        type="submit"
      >
        Guardar
      </Button>
    </form>
)
}
