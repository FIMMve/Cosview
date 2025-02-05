import { useUsersList } from "@/hooks/useUsersList"
import { Modal, ModalBody, ModalContent, ModalHeader, Input, Select, SelectItem, ModalFooter, Button } from "@nextui-org/react"
import LogMessage from "../LogMessage"
import { useForm } from "react-hook-form"
import { UserFormValues } from "@/types"
import { useEffect, useState } from "react"

type EditUserFormProps = {
  isOpen: boolean
  onOpenChange: () => void
}

export default function EditUserForm({isOpen, onOpenChange}: EditUserFormProps) {
  const { handleEdit, log, setLog, currentUser, setCurrentUser } = useUsersList()
  const {  handleSubmit, reset } = useForm<UserFormValues>()

  const [send, setSend] = useState(false)

  const onSubmit = handleSubmit(async () => {
    setSend(true)
  })
  
  useEffect(() => {
    if(send === true){
      const request = async () => {
        const res = await handleEdit(currentUser)
        if(res) reset()
      }
  
      request()
    }

    setSend(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  return (
    <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
    <ModalContent>
      {(onClose) => (
        <>
          <form onSubmit={onSubmit} >
            <ModalHeader className="flex flex-col gap-1">Editar Usuario</ModalHeader>
            <ModalBody className="flex flex-col gap-5">
              <Input
                type="text"
                label="Nombre de Usuario"
                value={currentUser?.username}
                onChange={e => setCurrentUser({...currentUser, username: e.target.value})}
              />

              <div className="flex gap-2">
                <Select
                  className="w-24"
                  label="Tipo"
                  defaultSelectedKeys={[(currentUser.id_number[0] === "V" || currentUser.id_number[0] === "E" || currentUser.id_number[0] === "J") ? currentUser.id_number[0] : "V"]}
                  onSelectionChange={e => setCurrentUser({...currentUser, id_number: `${e.currentKey}${currentUser.id_number.substring(1)}`})}
                  disallowEmptySelection
                >
                  <SelectItem key="V" value="V">V</SelectItem>
                  <SelectItem key="J" value="J">J</SelectItem>
                  <SelectItem key="E" value="E">E</SelectItem>
                </Select>

                <Input
                  className="w-full"
                  type="text"
                  label="Cédula"
                  defaultValue={currentUser.id_number.substring(1)}
                  onChange={e => setCurrentUser({...currentUser, id_number: `${currentUser.id_number[0]}${e.target.value}`})}
                />
              </div>

              <Input
                type="email"
                label="Correo Electrónico"
                value={currentUser?.email}
                onChange={e => setCurrentUser({...currentUser, email: e.target.value})}
              />

              <Input
                type="number"
                label="Número Telefónico"
                maxLength={14}
                value={currentUser?.phone_number}
                onChange={e => setCurrentUser({...currentUser, phone_number: e.target.value})}
              />

              <Select
                label="Rol"
                defaultSelectedKeys={[currentUser?.role]}
                onSelectionChange={e => setCurrentUser({...currentUser, role: e.currentKey ? e.currentKey : "user"})}
              >
                <SelectItem key="user" value="user">Usuario</SelectItem>
                <SelectItem key="admin" value="admin">Administrador</SelectItem>
            </Select>

            {log.type && <LogMessage log={log} />}

            </ModalBody>
            <ModalFooter>
              <Button size="sm" color="danger" variant="light" onPress={() => {
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
  </Modal>  )
}
