import { Button, DateInput, Input } from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
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

export default function EditPRLForm({companyId, sysl, setEdit} : EditSySLFormProps) {
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
        label="Programa Recreativo Laboral"
        defaultValue={sysl?.prl ? parseDate(dateFormatter(sysl.prl)) : null}
        onChange={e => setUpdatedSysl({...updatedSysl, prl: formatter.format(e.toDate(getLocalTimeZone()))})}
      />

      <Input 
        type="text"
        size="sm"
        label="Primer Turno"
        value={updatedSysl?.shifts?.first_shift}
        onChange={e => setUpdatedSysl({...updatedSysl, shifts: {...updatedSysl.shifts, first_shift: e.target.value}})}
      />

      <Input 
        type="text"
        size="sm"
        label="Segundo Turno"
        value={updatedSysl?.shifts?.second_shift}
        onChange={e => setUpdatedSysl({...updatedSysl, shifts: {...updatedSysl.shifts, second_shift: e.target.value}})}
      />

      <div className="flex gap-2">
        <Input 
          type="text"
          size="sm"
          label="Componente Cultural"
          value={updatedSysl?.cultural_component?.item}
          onChange={e => setUpdatedSysl({...updatedSysl, cultural_component: {...updatedSysl.cultural_component, item: e.target.value}})}
        />

        <Input 
          type="text"
          size="sm"
          label="Mes"
          value={updatedSysl?.cultural_component?.month}
          onChange={e => setUpdatedSysl({...updatedSysl, cultural_component: {...updatedSysl.cultural_component, month: e.target.value}})}
        />
      </div>

      <div className="flex gap-2">
        <Input 
          type="text"
          size="sm"
          label="Componente Deportivo"
          value={updatedSysl?.sports_component?.item}
          onChange={e => setUpdatedSysl({...updatedSysl, sports_component: {...updatedSysl.sports_component, item: e.target.value}})}
        />

        <Input 
          type="text"
          size="sm"
          label="Mes"
          value={updatedSysl?.sports_component?.month}
          onChange={e => setUpdatedSysl({...updatedSysl, sports_component: {...updatedSysl.sports_component, month: e.target.value}})}
        />
      </div>

      <div className="flex gap-2">
        <Input 
          type="text"
          size="sm"
          label="Componente Recreacional"
          value={updatedSysl?.recreational_component?.item}
          onChange={e => setUpdatedSysl({...updatedSysl, recreational_component: {
            ...updatedSysl.recreational_component, 
            item: e.target.value
          }})}
        />

        <Input 
          type="text"
          size="sm"
          label="Mes"
          value={updatedSysl?.recreational_component?.month}
          onChange={e => setUpdatedSysl({...updatedSysl, recreational_component: {...updatedSysl.recreational_component, month: e.target.value}})}
        />
      </div>


      <div className="flex gap-2">
        <Input 
          type="text"
          size="sm"
          label="Componente de Formación"
          value={updatedSysl?.formation_component?.item}
          onChange={e => setUpdatedSysl({...updatedSysl, formation_component: {...updatedSysl.formation_component, item: e.target.value}})}
        />

        <Input 
          type="text"
          size="sm"
          label="Mes"
          value={updatedSysl?.formation_component?.month}
          onChange={e => setUpdatedSysl({...updatedSysl, formation_component: {...updatedSysl.formation_component, month: e.target.value}})}
        />
      </div>

      <div className="flex gap-2">
        <Input 
          type="text"
          size="sm"
          label="Componente Familiar"
          value={updatedSysl?.familiar_component?.item}
          onChange={e => setUpdatedSysl({...updatedSysl, familiar_component: {...updatedSysl.familiar_component, item: e.target.value}})}
        />

        <Input 
          type="text"
          size="sm"
          label="Mes"
          value={updatedSysl?.familiar_component?.month}
          onChange={e => setUpdatedSysl({...updatedSysl, familiar_component: {...updatedSysl.familiar_component, month: e.target.value}})}
        />
      </div>

      <div className="flex gap-2">
        <DateInput 
          size="sm"
          label="Gimnasia Mental"
          defaultValue={sysl?.brain_gymnastics?.date ? parseDate(dateFormatter(sysl?.brain_gymnastics?.date)) : null}
          onChange={e => setUpdatedSysl({...updatedSysl, brain_gymnastics: {
            ...updatedSysl.brain_gymnastics,
            date: formatter.format(e.toDate(getLocalTimeZone()))
          }})}
        />

        <Input 
          type="text"
          size="sm"
          label="Hora"
          value={updatedSysl?.brain_gymnastics?.hour}
          onChange={e => setUpdatedSysl({...updatedSysl, brain_gymnastics: {...updatedSysl.brain_gymnastics, hour: e.target.value}})}
        />
      </div>

      <div className="flex gap-2">
        <DateInput 
          size="sm"
          label="Dinámicas de Integración"
          defaultValue={sysl?.integration_dynamics?.date ? parseDate(dateFormatter(sysl?.integration_dynamics?.date)) : null}
          onChange={e => setUpdatedSysl({...updatedSysl, integration_dynamics: {
            ...updatedSysl.integration_dynamics,
            date: formatter.format(e.toDate(getLocalTimeZone()))
          }})}
        />

        <Input 
          type="text"
          size="sm"
          label="Hora"
          value={updatedSysl?.integration_dynamics?.hour}
          onChange={e => setUpdatedSysl({...updatedSysl, integration_dynamics: {...updatedSysl.integration_dynamics, hour: e.target.value}})}
        />
      </div>

      <div className="flex gap-2">
        <DateInput 
          size="sm"
          label="Pausa Activa 1"
          defaultValue={sysl?.active_pause?.first?.date ? parseDate(dateFormatter(sysl.active_pause?.first?.date)) : null}
          onChange={e => setUpdatedSysl({...updatedSysl, active_pause: {
            ...updatedSysl.active_pause,
            first: {
              ...updatedSysl.active_pause.first,
              date: formatter.format(e.toDate(getLocalTimeZone()))
            }
          }})}
        />

        <Input 
          type="text"
          size="sm"
          label="Hora de Inicio"
          value={updatedSysl?.active_pause?.first?.hour}
          onChange={e => setUpdatedSysl({...updatedSysl, active_pause: {
            ...updatedSysl.active_pause, 
            first: {
              ...updatedSysl.active_pause.first,
              hour: e.target.value
            }
          }})}
        />
      </div>      

      <div className="flex gap-2">
        <DateInput 
          size="sm"
          label="Pausa Activa 2"
          defaultValue={sysl?.active_pause.second?.date ? parseDate(dateFormatter(sysl.active_pause?.second?.date)) : null}
          onChange={e => setUpdatedSysl({...updatedSysl, active_pause: {
            ...updatedSysl.active_pause,
            second: {
              ...updatedSysl.active_pause.second,
              date: formatter.format(e.toDate(getLocalTimeZone()))
            }
          }})}
        />

        <Input 
          type="text"
          size="sm"
          label="Hora de Inicio"
          value={updatedSysl?.active_pause?.second?.hour}
          onChange={e => setUpdatedSysl({...updatedSysl, active_pause: {
            ...updatedSysl.active_pause, 
            second: {
              ...updatedSysl.active_pause.second,
              hour: e.target.value
            }
          }})}
        />
      </div>      

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
