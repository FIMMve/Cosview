"use client"

import { useEffect } from "react";
import { useUsersList } from "@/hooks/useUsersList";
import { useDisclosure} from "@nextui-org/react";
import UsersTable from "./UsersTable";
import EditUserForm from "./EditUserForm";

export default function UsersList() {
  const { getUsers} = useUsersList()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className="mt-10">
      <UsersTable onOpen={onOpen} />

      <EditUserForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </article>
  )
}
