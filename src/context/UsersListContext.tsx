import { useState } from "react";
import { createContext } from "react";
import type { Log, UserData, UserFormValues } from "@/types";

type UsersListContextProps = {
  getUsers: () => Promise<Response>
  usersList: UserData[]
  log: Log
  setLog: React.Dispatch<React.SetStateAction<Log>>
  createUser: (data: UserFormValues) => Promise<boolean | undefined>
  currentUser: UserData
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData>>
  handleDelete: (id?: number) => Promise<void>
  handleEdit: (data: UserFormValues) => Promise<boolean | undefined>
}

type UsersListProviderProps = {
  children: React.ReactNode
}

export const UsersListContext = createContext<UsersListContextProps>(null!);

export const UsersListProvider = ({children} : UsersListProviderProps) => {
  const [usersList, setUsersList] = useState<UserData[]>([])
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData)
  const [log, setLog] = useState<Log>({ type: "", message: "" })

  const getUsers = async () => {
    const res = await fetch("/api/user/get-users-list")
    if(res.ok) {
      const data = await res.json()
      data.users.map((user : any) => setUsersList([...usersList, {
        id: user.id,
        username: user.username,
        id_number: user.id_number,
        email: user.email,
        role: user.role,
        phone_number: user.phone_number
      }]))
      setUsersList(data.users)
    }
    return res
  }

  const createUser = async (data: UserFormValues) => {
    if (data.password !== data.confirm_password) {
      setLog({
        type: "error",
        message: "Las contraseñas no coinciden..."
      })
      return
    }

    const res = await fetch(`/api/user/create-user`, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        id_number: data.id_number,
        email: data?.email?.toLowerCase(),
        phone_number: data.phone_number,
        password: data.password ? data.password : null,
        role: data.role
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Usuario Registrado..."
      })
      getUsers()
    } else {
      setLog({
        type: "error",
        message: res.statusText
      })
    }
    return res.ok
  }

  const handleDelete = async (id?: number) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este usuario?")
    if (!confirm) return
    const res = await fetch(`/api/user/delete-user`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) getUsers()
  }

  const handleEdit = async (data: UserFormValues) => {
    const res = await fetch(`/api/user/update-user`, {
      method: "PUT",
      body: JSON.stringify({
        id: currentUser.id,
        username: data.username,
        id_number: data.id_number,
        email: data.email.toLowerCase(),
        phone_number: data.phone_number,
        password: data.password ? data.password : null,
        role: data.role
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Usuario Actualizado..."
      })
      getUsers()
    } else {
      setLog({
        type: "error",
        message: "El Nombre, Cédula, Número Telefónico o Correo Electrónico ya existente..."
      })
    }    
    return res.ok
  }

  return(
    <UsersListContext.Provider
      value={{
        getUsers,
        usersList,
        log,
        setLog,
        createUser,
        currentUser,
        setCurrentUser,
        handleDelete,
        handleEdit
      }}
    >
      {children}
    </UsersListContext.Provider>
  )
}
