"use client"

import { Button, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"

type EditFirstAidsProps = {
  companyId: number
  updatedFirstAids: any
  setUpdatedFirstAids: React.Dispatch<any>
  getFirstAids: (id: number) => Promise<void>
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditFirstAids({companyId, updatedFirstAids, setUpdatedFirstAids, getFirstAids, edit, setEdit} : EditFirstAidsProps) {
  const {handleSubmit} = useForm()

  const onSubmit = handleSubmit(async () => {
    delete updatedFirstAids.id
    delete updatedFirstAids.company_id
    const res = await fetch(`/api/inspections/update-first-aids?query=${companyId}`, {
      method: "POST",
      body: JSON.stringify({
        ...updatedFirstAids,
        cotton: +updatedFirstAids.cotton,
        gauze_roll: +updatedFirstAids.gauze_roll,
        sterile_gauze: +updatedFirstAids.sterile_gauze,
        eye_cures: +updatedFirstAids.eye_cures,
        adhesive: +updatedFirstAids.adhesive,
        bandaids: +updatedFirstAids.bandaids,
        elastic_bandage_6: +updatedFirstAids.elastic_bandage_6,
        elastic_bandage_8: +updatedFirstAids.elastic_bandage_8,
        elastic_bandage_12: +updatedFirstAids.elastic_bandage_12,
        sterile_dressing: +updatedFirstAids.sterile_dressing,
        tongue_depressor: +updatedFirstAids.tongue_depressor,
        cotton_applicator: +updatedFirstAids.cotton_applicator,
        triangular_bandages: +updatedFirstAids.triangular_bandages,
        scissors: +updatedFirstAids.scissors,
        soap: +updatedFirstAids.soap,
        oral_thermometer: +updatedFirstAids.oral_thermometer,
        eye_wash: +updatedFirstAids.eye_wash,
        anti_inflammatory: +updatedFirstAids.anti_inflammatory,
        alcohol: +updatedFirstAids.alcohol,
        hydrogen_peroxide: +updatedFirstAids.hydrogen_peroxide,
        disposable_gloves: +updatedFirstAids.disposable_gloves,
      }),
      headers: { "Content-Type" : "application/json"}
    })
    if(res.ok){
      getFirstAids(companyId)

      if(edit) setEdit(false)
    }else{
      alert("Ha ocurrido un error, vuelve a intentarlo...")
      console.log(res)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 lg:items-end"
    >
      <div className="flex flex-col gap-2 lg:flex-row w-full lg:justify-between">
        <Input 
          size="sm"
          label="Ubicación del Botiquín"
          type="text"
          className="w-full md:w-80 my-5"
          value={updatedFirstAids.location}
          onChange={e => setUpdatedFirstAids({...updatedFirstAids, location: e.target.value})}
        />
        <div className="w-full flex flex-col md:flex-row md:justify-around gap-2">
          <div className="flex flex-col gap-2">
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Algodón"
              value={updatedFirstAids.cotton}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, cotton: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Rollo de Gasas"
              value={updatedFirstAids.gauze_roll}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, gauze_roll: +e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Gasa Estéril"
              value={updatedFirstAids.sterile_gauze}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, sterile_gauze: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Curaciones para ojos"
              value={updatedFirstAids.eye_cures}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, eye_cures: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Adhesivos"
              value={updatedFirstAids.adhesive}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, adhesive: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Curitas"
              value={updatedFirstAids.bandaids}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, bandaids: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Venda Elástica 6cm"
              value={updatedFirstAids.elastic_bandage_6}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, elastic_bandage_6: e.target.value})}
            />                  
          </div>
          <div className="flex flex-col gap-2">
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Venda Elástica 8cm"
              value={updatedFirstAids.elastic_bandage_8}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, elastic_bandage_8: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Venda Elástica 12cm"
              value={updatedFirstAids.elastic_bandage_12}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, elastic_bandage_12: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Apósito estéril"
              value={updatedFirstAids.sterile_dressing}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, sterile_dressing: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Espátula lingual"
              value={updatedFirstAids.tongue_depressor}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, tongue_depressor: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Aplicador de algodón"
              value={updatedFirstAids.cotton_applicator}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, cotton_applicator: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Venda triangular"
              value={updatedFirstAids.triangular_bandages}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, triangular_bandages: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Tijeras"
              value={updatedFirstAids.scissors}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, scissors: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Jabón"
              value={updatedFirstAids.soap}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, soap: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Termómetro oral"
              value={updatedFirstAids.oral_thermometer}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, oral_thermometer: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Lavado ocular"
              value={updatedFirstAids.eye_wash}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, eye_wash: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Antiinflamatorio"
              value={updatedFirstAids.anti_inflammatory}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, anti_inflammatory: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Alcohol"
              value={updatedFirstAids.alcohol}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, alcohol: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Agua Oxigenada"
              value={updatedFirstAids.hydrogen_peroxide}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, hydrogen_peroxide: e.target.value})}
            />
            <Input 
              labelPlacement="inside"
              type="number"
              maxLength={2}
              label="Guantes desechables"
              value={updatedFirstAids.disposable_gloves}
              onChange={e => setUpdatedFirstAids({...updatedFirstAids, disposable_gloves: e.target.value})}
            />
          </div>
        </div>
      </div>
      <Button 
        size="sm"
        className={`mt-5 w-full lg:w-72 bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black`}
        type="submit"
      >
        Guardar
      </Button>
    </form>
  )
}
