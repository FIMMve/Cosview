import { useUsersList } from "@/hooks/useUsersList"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import OptionsIcon from "../icons/OptionsIcon"
import EditIcon from "../icons/EditIcon"
import DeleteIcon from "../icons/DeleteIcon"

type UsersTableProps = {
  onOpen: () => void
}

const column = [
  { label: "", key: "actions" },
  { label: "ID", key: "id" },
  { label: "Nombre", key: "username" },
  { label: "Cédula", key: "id_number" },
  { label: "Correo Electrónico", key: "email" },
  { label: "Rol", key: "role" },
  { label: "Teléfono", key: "phone_number" },
]

export default function UsersTable({ onOpen } : UsersTableProps) {
  const { usersList, setCurrentUser, handleDelete } = useUsersList()

  return (
    <Table className="scrollbar-hide" isHeaderSticky classNames={{base: "max-h-[500px] overflow-scroll",}} aria-label="Lista de usuarios">
    <TableHeader>
      {column.map(column => <TableColumn className={column.key === "actions" ? "flex justify-center items-center" : ""} key={column.key}>{column.label}</TableColumn>)}
    </TableHeader>
    <TableBody emptyContent="No hay usuarios...">
      {usersList.map(user => (
        <TableRow className={`${user.role === "admin" && "text-danger"}`} key={user.id}>
          <TableCell className="flex justify-center">
            <Dropdown>
              <DropdownTrigger>
                <button><OptionsIcon /></button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Acciones de usuario"
                onAction={key => {
                  if(key === "edit"){
                    setCurrentUser({
                      email: user.email,
                      id: user.id,
                      id_number: user.id_number,
                      phone_number: user.phone_number,
                      role: user.role,
                      username: user.username
                    })
                    onOpen()
                  }
  
                  if(key === "delete") handleDelete(user.id)
                }}
              >
                <DropdownItem key="edit" startContent={<EditIcon />} >
                  Editar
                </DropdownItem>
                <DropdownItem className="text-danger" key="delete" startContent={<DeleteIcon />} >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </TableCell>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.id_number}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.phone_number}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table> 
  )
}
