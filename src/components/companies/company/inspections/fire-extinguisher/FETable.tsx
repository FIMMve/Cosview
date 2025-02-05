"use client"

import CheckIcon from '@/components/icons/CheckIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import DeleteIcon from '@/components/icons/DeleteIcon'
import EditIcon from '@/components/icons/EditIcon'
import OptionsIcon from '@/components/icons/OptionsIcon'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

type FETableProps = {
  onOpen: () => void
  companyId: number
  fireExtinguishers: any
  setFireExtinguishers: React.Dispatch<any>
  getFireExtinguishers: (id: number) => Promise<void>
  setCurrentFE: React.Dispatch<any>
}

const column = [
  {label: "", key: "actions"},
  {label: "ID", key: "id"},
  {label: "Ubicación", key: "location"},
  {label: "Fecha de Vencimiento", key: "expiration_date"},
  {label: "Tipo de Carga y Fuego", key: "type_of_charge_and_fire"},
  {label: "Capacidad", key: "capacity"},
  {label: "Mantenimiento", key: "maintenance"},
  {label: "Libre de Obstáculos", key: "free_of_obstacles"},
  {label: "Palanca de Activación", key: "activation_lever"},
  {label: "Manilla de Acarreo", key: "carrying_handle"},
  {label: "Precinto de Seguridad", key: "safety_seal"},
  {label: "Manómetro de Carga", key: "pressure_gauge"},
  {label: "Cilindro", key: "cylinder"},
  {label: "Etiquetas", key: "labels"},
  {label: "Manguera", key: "hose"},
  {label: "Sujetador de Manguera", key: "hose_holder"},
  {label: "Tobera", key: "nozzle"}
];

export default function FETable({companyId, onOpen, fireExtinguishers, getFireExtinguishers, setCurrentFE} : FETableProps) {
  const handleDelete = async (id: number, companyId: number) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este extintor?")
    if (!confirm) return
    const res = await fetch(`/api/inspections/delete-fire-extinguisher`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) getFireExtinguishers(companyId)    
  }

  return (
<Table isHeaderSticky className="scrollbar-hide" classNames={{base: "max-h-[500px] overflow-scroll",}} aria-label="Nómina de Empleados">
      <TableHeader>
        {column.map(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
      </TableHeader>
      <TableBody>
          {fireExtinguishers.map((fe: any) => (
            <TableRow key={fe.id}>
              <TableCell className="flex justify-center">
              <Dropdown>
                <DropdownTrigger>
                  <button><OptionsIcon /></button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Acciones de usuario"
                  onAction={key => {
                    if(key === "edit"){
                      setCurrentFE(fe)
                      setTimeout(() => onOpen(), 500)
                    }
                    
                    if(key === "delete"){
                      handleDelete(fe.id, companyId)
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
              <TableCell>{fe.id}</TableCell>
              <TableCell>{fe.location}</TableCell>
              <TableCell>{fe.expiration_date}</TableCell>
              <TableCell>{fe.type_of_charge_and_fire}</TableCell>
              <TableCell>{fe.capacity}</TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.maintenance ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.free_of_obstacles ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.activation_lever ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.carrying_handle ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.safety_seal ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.pressure_gauge ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.cylinder ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.labels ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.hose ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.hose_holder ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
              <TableCell><div className="w-full flex justify-center">{fe.nozzle ? <CheckIcon /> : <CloseIcon />}</div></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
