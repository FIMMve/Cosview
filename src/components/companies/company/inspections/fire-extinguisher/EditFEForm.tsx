"use client"

import { dateFormatter } from "@/app/utils/dateFormatter"
import LogMessage from "@/components/LogMessage"
import { getLocalTimeZone, parseDate } from "@internationalized/date"
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react"
import { useDateFormatter } from "@react-aria/i18n"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type EditFEFormProps = {
  isOpen: boolean
  onOpenChange: () => void
  companyId: number
  currentFE: any
  setCurrentFE: React.Dispatch<any>
  setLog: React.Dispatch<React.SetStateAction<{
    type: string;
    message: string;
  }>>
  log: {
    type: string;
    message: string;
  }
  getFireExtinguishers: (id: number) => Promise<void>
}

export default function EditFEForm({isOpen, onOpenChange, companyId, currentFE, setCurrentFE, log, setLog, getFireExtinguishers} : EditFEFormProps) {
  const { handleSubmit, reset } = useForm()
  const formatter = useDateFormatter({dateStyle: "medium"})

  const [expirationDate, setExpirationDate] = useState<any>(parseDate("2024-04-04"))
  const [send, setSend] = useState<boolean>(false)

  const onSubmit = handleSubmit(async () => {
    setCurrentFE({
      ...currentFE,
      expiration_date: formatter.format(expirationDate.toDate(getLocalTimeZone())),
    })
    setSend(true)
  })

  const handleEdit = async (data: any, companyId: number) => {
    const res = await fetch(`/api/inspections/update-fire-extinguisher`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      setLog({
        type: "success",
        message: "Extintor Actualizado..."
      })
      getFireExtinguishers(companyId)
    } else {
      setLog({
        type: "error",
        message: res.statusText
      })
    }

    return res
  }

  useEffect(() => {
    if(send === true) {
      const request = async () => {
        setLog({
          type: "",
          message: ""
        })
        const res = await handleEdit(currentFE, companyId)
        if(res.ok){
          reset()
          return
        }     
        setLog({
          type: "error",
          message: "Error al editar el extintor"
        }) 
      }
      request()
    }
    setSend(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  useEffect(() => {
    if(currentFE?.expiration_date) setExpirationDate(parseDate(dateFormatter(currentFE?.expiration_date)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFE])

  return (
    <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
      {(onClose) => (
        <>
          <form onSubmit={onSubmit} >
            <ModalHeader className="flex flex-col gap-1">Agregar Extintor</ModalHeader>
            <ModalBody className="flex flex-col gap-5">

            <Input 
              type="text"
              label="Ubicación"
              value={currentFE.location}
              onChange={e => setCurrentFE({...currentFE, location: e.target.value})}
            />

            <DateInput 
              size="sm"
              label="Fecha de Vencimiento"
              value={expirationDate}
              onChange={setExpirationDate}
            />

            <Select
              className="w-full"
              label="Tipo de Carga y Fuego"
              defaultSelectedKeys={[currentFE.type_of_charge_and_fire]}
              disallowEmptySelection
              onChange={e => {setCurrentFE({...currentFE, type_of_charge_and_fire: e.target.value})}}
            >
              <SelectItem key="PQS/ABC" value="PQS/ABC">PQS/ABC</SelectItem>
              <SelectItem key="CO2/BC" value="CO2/BC">CO2/BC</SelectItem>
            </Select>

            <Input
              className="w-full"
              type="number"
              label="Capacidad (Lbs)"
              maxLength={2}
              value={currentFE.capacity}
              onChange={e => setCurrentFE({...currentFE, capacity: e.target.value})}
            />

            <div className='grid grid-cols-2 gap-2'>
              <RadioGroup 
                label="Mantenimiento al Día"
                value={currentFE.maintenance ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, maintenance: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Libre de Obstáculos"
                value={currentFE.free_of_obstacles ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, free_of_obstacles: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Palanca de Activación"
                value={currentFE.activation_lever ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, activation_lever: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Manilla de Acarreo"
                value={currentFE.carrying_handle ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, carrying_handle: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Precinto de Seguridad"
                value={currentFE.safety_seal ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, safety_seal: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Manómetro de Carga"
                value={currentFE.pressure_gauge ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, pressure_gauge: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Cilíndro"
                value={currentFE.cylinder ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, cylinder: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Etiquetas"
                value={currentFE.labels ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, labels: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Manguera"
                value={currentFE.hose ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, hose: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Sujetador de Manguera"
                value={currentFE.hose_holder ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, hose_holder: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>

              <RadioGroup 
                label="Tobera"
                value={currentFE.nozzle ? "Si" : "No"}
                onChange={e => setCurrentFE({...currentFE, nozzle: e.target.value === "Si"})}
                orientation="horizontal"
              >
                <Radio key="yes" value="Si">Si</Radio>
                <Radio key="no" value="No">No</Radio>
              </RadioGroup>
                </div>           

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
  )
}
