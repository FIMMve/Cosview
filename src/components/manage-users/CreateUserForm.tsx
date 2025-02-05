import { useUsersList } from "@/hooks/useUsersList";
import { useForm } from "react-hook-form"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import LogMessage from "@/components/LogMessage"
import type { UserFormValues } from "@/types"

export default function FormModal() {
  const { createUser, log, setLog } = useUsersList()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, formState: { errors }, handleSubmit, reset } = useForm<UserFormValues>();

  const onSubmit = handleSubmit(async data => {
    data = {
      ...data,
      id_number: `${data.id_type}${data.id_number}`
    }

    delete data.id_type

    const res = await createUser(data)

    if(res) reset()
  })

  return (
    <div>
      <Button size="sm" className="mt-5 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onOpen}>Crear Usuario</Button>
      <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={onSubmit} autoComplete="off" >
                <ModalHeader className="flex flex-col gap-1">Crear Usuario</ModalHeader>
                <ModalBody className="flex flex-col gap-5">
                  <Input
                    type="text"
                    label="Nombre de Usuario"
                    isInvalid={errors.username && true}
                    errorMessage={errors.username?.message}
                    {...register("username", {
                      required: {
                        value: true,
                        message: "El nombre de usuario es obligatorio..."
                      }
                    })}
                  />

                  <div className="flex gap-2">
                    <Select
                      className="w-24"
                      label="Tipo"
                      defaultSelectedKeys={["V"]}
                      errorMessage={errors.id_type?.message}
                      isInvalid={errors.id_type && true}
                      disallowEmptySelection
                      {...register("id_type", {
                        required: {
                          value: true,
                          message: "El Tipo de Cédula es Obligatorio..."
                        }
                      })}
                    >
                      <SelectItem key="V" value="V">V</SelectItem>
                      <SelectItem key="J" value="J">J</SelectItem>
                      <SelectItem key="E" value="E">E</SelectItem>
                    </Select>

                    <Input
                      className="w-full"
                      type="number"
                      label="Cédula"
                      maxLength={8}
                      errorMessage={errors.id_number?.message}
                      isInvalid={errors.id_number && true}
                      {...register("id_number", {
                        required: {
                          value: true,
                          message: "El número de cédula es obligatorio..."
                        }
                      })}
                    />
                  </div>

                  <Input
                    type="email"
                    label="Correo Electrónico"
                    errorMessage={errors.email?.message}
                    isInvalid={errors.email && true}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "El email es obligatorio..."
                      }
                    })}
                  />

                  <Input
                    type="number"
                    label="Número Telefónico"
                    maxLength={14}
                    errorMessage={errors.phone_number?.message}
                    isInvalid={errors.phone_number && true}
                    {...register("phone_number", {
                      required: {
                        value: true,
                        message: "El número telefónico es obligatorio..."
                      }
                    })}
                  />

                  <Select
                    label="Rol"
                    errorMessage={errors.role?.message}
                    isInvalid={errors.role && true}
                    {...register("role", {
                      required: {
                        value: true,
                        message: "El rol es obligatorio..."
                      }
                    })}
                  >
                    <SelectItem key="user" value="user">Usuario</SelectItem>
                    <SelectItem key="admin" value="admin">Administrador</SelectItem>
                  </Select>

                  <Input
                    type="password"
                    label="Contraseña"
                    errorMessage={errors.password?.message}
                    isInvalid={errors.password && true}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "La contraseña es obligatoria..."
                      }
                    })}
                  />

                  <Input
                    type="password"
                    label="Confirmar Contraseña"
                    errorMessage={errors.confirm_password?.message}
                    isInvalid={errors.confirm_password && true}
                    {...register("confirm_password", {
                      required: {
                        value: true,
                        message: "Confirme la contraseña..."
                      }
                    })}
                  />

                {log.type && <LogMessage log={log} />}

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={() => {
                    onClose()
                    setLog({ type: "", message: "" })
                  }}>
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black"
                    type="submit"
                  >
                    Guardar
                  </Button>

                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
