import { useState, useEffect } from "react"
import { useEmployee } from "@/hooks/useEmployee"
import { useForm } from "react-hook-form"
import { Button, Checkbox, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react"
import { EmployeeFormValues } from "@/types"
import LogMessage from "@/components/LogMessage"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"
import { calculateTranscurredYears, dateComparator, dateFormatter } from "@/app/utils/dateFormatter"

type EditEmployeeFormProps = {
  isOpen: boolean
  onOpenChange: () => void
  companyId: number
}

export default function EditEmployeeForm({ isOpen, onOpenChange, companyId } : EditEmployeeFormProps) {
  const { currentEmployee, setCurrentEmployee, log, setLog, handleEdit } = useEmployee()
  const { handleSubmit, reset } = useForm<EmployeeFormValues>()

  const formatter = useDateFormatter({dateStyle: "medium"})

  const [birthdate, setBirthdate] = useState<any>(parseDate("2024-04-04"))
  const [hireDate, setHireDate] = useState<any>(parseDate("2024-04-04"))
  const [terminationDate, setTerminationDate] = useState<any>(parseDate("2024-04-04"))

  const [send, setSend] = useState<boolean>(false)

  const onSubmit = handleSubmit(async () => {
    setCurrentEmployee({
      ...currentEmployee,
      birthdate: formatter.format(birthdate.toDate(getLocalTimeZone())),
      hire_date: formatter.format(hireDate.toDate(getLocalTimeZone())),
      termination_date: currentEmployee.status === "Retirado" ? formatter.format(terminationDate.toDate(getLocalTimeZone())) : null,
    })
    setSend(true)
  })

  useEffect(() => {
    if(send === true) {
      const request = async () => {
        const employeeAge = calculateTranscurredYears(currentEmployee.birthdate)
        const dateValidation = dateComparator(currentEmployee.termination_date, currentEmployee.hire_date)

        if(employeeAge > 99){
          setLog({
            type: "error",
            message: "La edad del empleado está fuera del rango..."
          })
          return
        }
    
        if(dateValidation){
          setLog({
            type: "error",
            message: "La fecha de contratación no puede ser mayor a la fecha de retiro del empleado..."
          })
          return
        }

        setLog({
          type: "",
          message: ""
        })
    
        const res = await handleEdit(currentEmployee, companyId)
    
        if(res.ok){
          reset()
        }        
      }
      request()
    }

    setSend(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send])

  useEffect(() => {
    if(currentEmployee.birthdate) setBirthdate(parseDate(dateFormatter(currentEmployee?.birthdate)))
    if(currentEmployee.hire_date) setHireDate(parseDate(dateFormatter(currentEmployee?.hire_date)))
    if(currentEmployee.termination_date) setTerminationDate(parseDate(dateFormatter(currentEmployee?.termination_date)))
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEmployee])

  return (
    <Modal isDismissable={false} scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
      {(onClose) => (
        <>
          <form onSubmit={onSubmit} >
            <ModalHeader className="flex flex-col gap-1">Agregar Empleado</ModalHeader>
            <ModalBody className="flex flex-col gap-5">

            <p>Datos Personales</p>
            <Input 
              type="text"
              label="Nombre Completo"
              value={currentEmployee?.name}
              onChange={e => setCurrentEmployee({...currentEmployee, name: e.target.value})}
            />

            <div className="flex gap-2">
              <Select
                className="w-24"
                label="Tipo"
                defaultSelectedKeys={[(currentEmployee.id_number[0] === "V" || currentEmployee.id_number[0] === "E" || currentEmployee.id_number[0] === "J") ? currentEmployee.id_number[0] : "V"]}
                onSelectionChange={e => setCurrentEmployee({...currentEmployee, id_number: `${e.currentKey}${currentEmployee.id_number.substring(1)}`})}
              >
                <SelectItem key="V" value="V">V</SelectItem>
                <SelectItem key="J" value="J">J</SelectItem>
                <SelectItem key="E" value="E">E</SelectItem>
              </Select>

              <Input 
                type="number"
                label="Cédula"
                maxLength={8}
                value={currentEmployee?.id_number.substring(1)}
                onChange={e => setCurrentEmployee({...currentEmployee, id_number: `${currentEmployee.id_number[0]}${e.target.value}`})}
              />
            </div>

            <Input 
              type="number"
              label="Teléfono"
              maxLength={14}
              value={currentEmployee.phone_number}
              onChange={e => setCurrentEmployee({...currentEmployee, phone_number: e.target.value})}
            />

            <Select
              label="Sexo"
              disallowEmptySelection
              defaultSelectedKeys={[currentEmployee.gender]}
              onSelectionChange={e => setCurrentEmployee({...currentEmployee, gender: e.currentKey ? e.currentKey : "Masculino"})}
            >
              <SelectItem key="Masculino" value="Masculino">Masculino</SelectItem>
              <SelectItem key="Femenino" value="Femenino">Femenino</SelectItem>
            </Select>

            <DateInput 
              size="sm"
              label="Fecha de Nacimiento"
              value={birthdate}
              onChange={setBirthdate}
              maxValue={today(getLocalTimeZone())}
            />

            <p>Datos de la Empresa</p>
            <Input
              type="text"
              label="Cargo"
              value={currentEmployee.position}
              onChange={e => setCurrentEmployee({...currentEmployee, position: e.target.value})}
            />

            <Checkbox 
              defaultSelected={currentEmployee.employeerRepresentative} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, employeerRepresentative: e.valueOf()})}
            >
              Representante Patronal
            </Checkbox>

            <Checkbox 
              defaultSelected={currentEmployee.preventionRepresentative} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, preventionRepresentative: e.valueOf()})}
            >
              Delegado de Prevención
            </Checkbox>

            <Checkbox 
              defaultSelected={currentEmployee.committee_delegate} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, committee_delegate: e.valueOf()})}
            >
              Delegado de Comité
            </Checkbox>

            <Checkbox 
              defaultSelected={currentEmployee.committee_second_postulate} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, committee_second_postulate: e.valueOf()})}
            >
              Segundo Postulado (Comité)
            </Checkbox>

            <Checkbox 
              defaultSelected={currentEmployee.committee_elections} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, committee_elections: e.valueOf()})}
            >
              Comisión Electoral
            </Checkbox> 

            <DateInput 
              size="sm"
              label="Fecha de Contratación"
              value={hireDate}
              onChange={setHireDate}
              maxValue={today(getLocalTimeZone())}
            />

            <Checkbox 
              defaultSelected={currentEmployee.route_format} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, route_format: e.valueOf()})}
            >
              Formato de Recorrido
            </Checkbox>

            <Checkbox 
              defaultSelected={currentEmployee.prevention_principles} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, prevention_principles: e.valueOf()})}
            >
              Principios de Prevención
            </Checkbox>

            <Checkbox 
              defaultSelected={currentEmployee.rutagrama} 
              onValueChange={e => setCurrentEmployee({...currentEmployee, rutagrama: e.valueOf()})}
            >
              Rutagrama
            </Checkbox>

            <RadioGroup 
              label="Estado del Trabajador"
              defaultValue={currentEmployee.status}
              onChange={e => setCurrentEmployee({...currentEmployee, status: e.target.value})}
            >
              <Radio key="active" value="Activo">Activo</Radio>
              <Radio key="inactive" value="Retirado">Retirado</Radio>
            </RadioGroup>

            {currentEmployee?.status === "Retirado" && (
              <DateInput 
                size="sm"
                label="Fecha de Retiro"
                value={terminationDate}
                onChange={setTerminationDate}
                maxValue={today(getLocalTimeZone())}
              />
            )}

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
