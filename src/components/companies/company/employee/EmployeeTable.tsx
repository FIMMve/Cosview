import CheckIcon from "@/components/icons/CheckIcon"
import CloseIcon from "@/components/icons/CloseIcon"
import DeleteIcon from "@/components/icons/DeleteIcon"
import EditIcon from "@/components/icons/EditIcon"
import OptionsIcon from "@/components/icons/OptionsIcon"
import { useEmployee } from "@/hooks/useEmployee"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

type EmployeeTableProps = {
  isRetired: boolean
  onOpen: () => void
  companyId: number
}

const column = [
  {label: "", key: "actions"},
  {label: "ID", key: "id"},
  {label: "Nombre", key: "name"},
  {label: "Cédula", key: "id_number"},
  {label: "Teléfono", key: "phone_number"},
  {label: "Sexo", key: "gender"},
  {label: "Cargo", key: "position"},
  {label: "Fecha de Nacimiento", key: "birthdate"},
  {label: "Fecha de Contratación", key: "hire_date"},
  {label: "Fecha de Retiro", key: "termination_date"},
  {label: "Formato de Recorrido", key: "route_format"},
  {label: "Principios de Prevención", key: "prevention_principles"},
  {label: "Rutagrama", key: "rutagrama"},
]

const excludedColumn = [
  "route_format",
  "prevention_principles",
  "rutagrama"
]

export default function EmployeeTable({ isRetired, onOpen, companyId } : EmployeeTableProps) {
  const { employeeList, setCurrentEmployee, handleDelete } = useEmployee()

  return (
    <Table isHeaderSticky className="scrollbar-hide" classNames={{base: "max-h-[500px] overflow-scroll",}} aria-label="Nómina de Empleados">
      <TableHeader>
        {column.map(column => <TableColumn key={column.key}>{isRetired ? !excludedColumn.includes(column.key) && column.label : column.key !== "termination_date" && column.label}</TableColumn>)}
      </TableHeader>
      <TableBody>
          {employeeList.filter(employee => isRetired ? employee.status === "Retirado" : employee.status === "Activo").map(employee => (
            <TableRow key={employee.id}>
              <TableCell className="flex justify-center">
              <Dropdown>
                <DropdownTrigger>
                  <button><OptionsIcon /></button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Acciones de usuario"
                  onAction={key => {
                    if(key === "edit"){
                      setCurrentEmployee(employee)
                      setTimeout(() => onOpen(), 500)
                    }
                    
                    if(key === "delete"){
                      handleDelete(employee.id, companyId)
                    }
                  }}
                >
                  <DropdownItem key="edit" startContent={<EditIcon />}>
                    Editar
                  </DropdownItem>
                  <DropdownItem className="text-danger" key="delete" startContent={<DeleteIcon />}>
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              </TableCell>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.id_number}</TableCell>
              <TableCell>{employee.phone_number}</TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.position}</TableCell>
              
              <TableCell>{employee.birthdate}</TableCell>
              <TableCell>{employee.hire_date}</TableCell>
              <TableCell><div className={`${!isRetired && "hidden"}`}>{employee.termination_date}</div></TableCell>

              <TableCell><div className={`${isRetired && "hidden"} w-full flex justify-center`}>{employee.route_format ? <CheckIcon /> : <CloseIcon />}</div></TableCell>

              <TableCell><div className={`${isRetired && "hidden"} w-full flex justify-center`}>{employee.prevention_principles ? <CheckIcon /> : <CloseIcon />}</div></TableCell>

              <TableCell><div className={`${isRetired && "hidden w-0"} w-full flex justify-center`}>{employee.rutagrama ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
