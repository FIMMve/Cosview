"use client"

import DeleteIcon from '@/components/icons/DeleteIcon'
import EditIcon from '@/components/icons/EditIcon'
import OptionsIcon from '@/components/icons/OptionsIcon'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

type FETableProps = {
  onOpen: () => void
  companyId: number
  capacitations: any
  setCapacitations: React.Dispatch<any>
  getCapacitations: (id: number) => Promise<void>
  setCurrentCapacitation: React.Dispatch<any>
}

const column = [
  {label: "", key: "actions"},
  {label: "Fecha", key: "date"},
  {label: "Tema", key: "topic"},
  {label: "Dinámica", key: "dynamics"},
];

export default function CapacitationsTable({companyId, onOpen, capacitations, getCapacitations, setCurrentCapacitation} : FETableProps) {
  const handleDelete = async (id: number, companyId: number) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta capacitación?")
    if (!confirm) return
    const res = await fetch(`/api/capacitations/delete-capacitation`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) getCapacitations(companyId)    
  }

  return (
<Table isHeaderSticky className="scrollbar-hide" classNames={{base: "max-h-[500px] overflow-scroll",}} aria-label="Nómina de Empleados">
      <TableHeader>
        {column.map(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
      </TableHeader>
      <TableBody>
          {capacitations.map((capacitation: any) => (
            <TableRow key={capacitation.id}>
              <TableCell className="flex justify-center">
              <Dropdown>
                <DropdownTrigger>
                  <button><OptionsIcon /></button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Acciones de usuario"
                  onAction={key => {
                    if(key === "edit"){
                      setCurrentCapacitation(capacitation)
                      setTimeout(() => onOpen(), 500)
                    }
                    
                    if(key === "delete"){
                      handleDelete(capacitation.id, companyId)
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
              <TableCell>{capacitation.date}</TableCell>
              <TableCell>{capacitation.topic}</TableCell>
              <TableCell>{capacitation.dynamics}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
