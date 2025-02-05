import { Button, Checkbox, DateInput, Input, Radio, RadioGroup } from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import FolderItemsForm from "./FolderItemsForm"
import { useDateFormatter } from "@react-aria/i18n"
import { getLocalTimeZone, parseDate } from "@internationalized/date"
import { dateFormatter } from "@/app/utils/dateFormatter"
import { useSysl } from "@/hooks/useSysl"

type EditSySLFormProps = {
  companyId: number
  sysl: any
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValues = {
  participation_approval_minutes: string
  signed_program: string
  occupational_doctor: string
}

export default function EditSySLForm({companyId, sysl, setEdit} : EditSySLFormProps) {
  const { editSysl } = useSysl()
  const { handleSubmit } = useForm<FormValues>()

  const [updatedSysl, setUpdatedSysl] = useState(sysl)

  const formatter = useDateFormatter({dateStyle: "medium"})

  const onSubmit = handleSubmit(async () => editSysl(companyId, updatedSysl, setEdit))

  return (
    <form
      className="flex flex-col gap-2  w-full"
      onSubmit={onSubmit}
    >
      <DateInput 
        size="sm"
        label="Programa de SySL"
        defaultValue={sysl?.sysl_program ? parseDate(dateFormatter(sysl.sysl_program)) : null}
        onChange={e => setUpdatedSysl({...updatedSysl, sysl_program: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-gray-400 mt-2">Acta de Participación y Aprobación</h3>
        <Checkbox
          isSelected={updatedSysl.participation_approval_minutes === "cumple"}
          onValueChange={e => setUpdatedSysl({...updatedSysl, participation_approval_minutes: e.valueOf() ? "cumple" : ""})}
        >
          Cumple
        </Checkbox>

        {!updatedSysl.participation_approval_minutes && (
          <Input 
            size="sm"
            label="Acta de Participacion"
            value={updatedSysl?.participation_approval_minutes}
            onChange={e => setUpdatedSysl({...updatedSysl, participation_approval_minutes: e.target.value})}
          />        
        )}
      </div>

      <RadioGroup
        className="mt-2"
        label="Programa Debidamente Firmado"
        value={updatedSysl?.signed_program ? "cumple" : "no cumple"}
        onValueChange={e => setUpdatedSysl({...updatedSysl, signed_program: (e.valueOf() === "cumple") ? true : false})}
      >
        <Radio value="cumple">Cumple</Radio>
        <Radio value="no cumple">No Cumple</Radio>
      </RadioGroup>

      <div className="mb-4 flex flex-col gap-2">
        <h3 className="text-gray-400 mt-2">Carpeta del Servicio</h3>
        <FolderItemsForm sysl={updatedSysl} setSysl={setUpdatedSysl} />
      </div>

      <DateInput 
        size="sm"
        label="Accidentabilidad"
        defaultValue={sysl?.accident_rate ? parseDate(dateFormatter(sysl.accident_rate)) : null}
        onChange={e => setUpdatedSysl({...updatedSysl, accident_rate: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <DateInput 
        size="sm"
        label="Morbilidad"
        defaultValue={sysl?.morbidity_rate ? parseDate(dateFormatter(sysl.morbidity_rate)) : null}
        onChange={e => setUpdatedSysl({...updatedSysl, morbidity_rate: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <Input
        type="text"
        size="sm"
        label="Médico Ocupacional"
        value={updatedSysl?.occupational_doctor}
        onChange={e => setUpdatedSysl({...updatedSysl, occupational_doctor: e.target.value})}
      />

      <Button 
        size="sm"
        className={`mt-5 w-full bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black`}
        type="submit"
      >
        Guardar
      </Button>
    </form>
  )
}
