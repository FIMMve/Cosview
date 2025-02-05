"use client"

import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import FormTemplate from "./FormTemplate";

type FormProps = {
  getCompanies: () => Promise<Response>
}

export default function AddCompany({ getCompanies }: FormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button size="sm" className="w-full md:max-w-44 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black" onPress={onOpen}>Agregar Empresa</Button>
      <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <FormTemplate type="create" className="px-5 pb-5 pt-0 flex flex-col gap-2" getCompanies={getCompanies} />  
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
