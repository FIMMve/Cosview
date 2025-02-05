import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import { CompanyData, CompanyFormValues, Log } from '@/types'
import DeleteIcon from '@/components/icons/DeleteIcon'
import LogMessage from '@/components/LogMessage'
import { useCompany } from '@/hooks/useCompany'

type FormTemplateProps = {
  type: "update" | "create"
  companyData?: CompanyData
  getCompanies?: () => Promise<Response>
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  className: string
}

export default function FormTemplate({type, className, companyData, getCompanies, setEdit} : FormTemplateProps) {
  const { updateCompany, getSingleCompany } = useCompany()
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<CompanyFormValues>()

  const [emails, setEmails] = useState<string[]>([])
  const [log, setLog] = useState<Log>({type: "", message: ""})

  const currentEmail = watch("email")

  useEffect(() => {
    if(companyData) setEmails(companyData?.email)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleCreate = handleSubmit(async data => {

    const res = await fetch("/api/company/add-company", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        company_name: data.company_name,
        phone_number: data.phone_number,
        email: emails,
        zone: data.zone,
        code: data.code,
        rif: data.rif,
        nil: data.nil,
        ivss: data.ivss,
        inces: data.inces,
        address: {
          state: data.state,
          municipality: data.municipality,
          parish: data.parish,
          address: data.address
        },
        economyc_activity: data.economyc_activity,
        section: data.section
      }),
      headers: {
        "Content-Type" : "application/json"
      }
    })

    if(res.ok){
      setLog({
        type: "success",
        message: "Empresa agregada"
      })
      reset()
      setEmails([])

      if(getCompanies) getCompanies()

    }else{
      setLog({
        type: "error",
        message: res.statusText
      })
    }
  })

  const handleUpdate = handleSubmit(async data => {    
    const formData = new FormData()
    let fileResponseData
    
    if(data.img && data.img[0]){
      formData.append("file", data.img[0])
  
      const fileResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      fileResponseData = await fileResponse.json()
    }

    const reqData = {
      id: companyData?.id,
      name: data.name,
      company_name: data.company_name,
      rif: data.rif,
      phone_number: data.phone_number,
      address: {
        state: data.state,
        municipality: data.municipality,
        parish: data.parish,
        address: data.address
      },
      zone: data.zone,
      section: data.section,
      code: data.code,
      nil: data.nil,
      ivss: data.ivss,
      inces: data.inces,
      economyc_activity: data.economyc_activity,
      img: fileResponseData ? fileResponseData.url : companyData?.img,
      email: emails
    }

    const res = await updateCompany(reqData)

    if(res.ok){
      if(companyData) getSingleCompany(companyData.id)
      if(setEdit) setEdit(false)
    }else{
      setLog({
        type: "error",
        message: res.statusText
      })
    }
  })

  return (
    <form 
      className={className}
      onSubmit={type === "create" ? handleCreate : handleUpdate} 
    >
      <h2 className="w-full text-2xl mb-3 font-bold text-primary dark:text-secondary">{type === "create" ? "Añadir Empresa" : "Editar Datos"}</h2>

      <div className={`flex flex-col gap-2 ${type === "update" && "lg:max-w-[48%]"}`}>
        <Input
          type="text"
          size="sm"
          label="Centro de Trabajo"
          defaultValue={companyData?.name}
          isClearable
          isInvalid={errors.name && true}
          errorMessage={errors?.name?.message}
          {...register("name", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
            }
          )}
        />

        <Input
          type="text"
          size="sm"
          label="Razón Social"
          defaultValue={companyData?.company_name}
          isClearable
          isInvalid={errors.company_name && true}
          errorMessage={errors?.company_name?.message}
          {...register("company_name", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
            }
          )}
        />

        <Input
          type="text"
          size="sm"
          label="Actividad Económica"
          defaultValue={companyData?.economyc_activity}
          isInvalid={errors.economyc_activity && true}
          errorMessage={errors?.economyc_activity?.message}
          isClearable
          {...register("economyc_activity", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
            }
          )}
        />

        <div className="flex justify-stretch gap-2">
          <Input
            type="text"
            label="RIF"
            size="sm"
            isClearable
            defaultValue={companyData?.rif}
            isInvalid={errors.rif && true}
            errorMessage={errors?.rif?.message}
            {...register("rif", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />

          <Input
            type="text"
            label="NIL"
            size="sm"
            isClearable
            defaultValue={companyData?.nil}
            isInvalid={errors.nil && true}
            errorMessage={errors?.nil?.message}
            {...register("nil", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />

          <Input
            type="text"
            label="IVSS"
            size="sm"
            isClearable
            defaultValue={companyData?.ivss}
            isInvalid={errors.ivss && true}
            errorMessage={errors?.ivss?.message}
            {...register("ivss", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />

          <Input
            type="text"
            label="INCES"
            size="sm"
            isClearable
            defaultValue={companyData?.inces}
            isInvalid={errors.inces && true}
            errorMessage={errors?.inces?.message}
            {...register("inces", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />
        </div>

        <Input 
          type="text"
          size="sm"
          label="Número Telefónico"
          defaultValue={companyData?.phone_number}
          isClearable
          isInvalid={errors.phone_number && true}
          errorMessage={errors.phone_number?.message}
          {...register("phone_number", {
            required: {
              value: true,
              message: "Campo requerido"
            }
            }
          )}
        />

        <div className="w-full flex flex-col gap-2">
          <Input 
            className='w-full'
            type="email"
            size="sm"
            label="Correo Electrónico"
            defaultValue={companyData?.email[0]}
            isClearable
            isInvalid={errors.email && true}
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          {emails &&
            emails.map((email, index) => (
              <div key={email} className="flex items-center gap-2">
                <button onClick={() => setEmails(emails.filter(current => current !== email && current))}>
                  <DeleteIcon />
                </button>
                <p key={index}>{email}</p>
              </div>
            ))
          }
        </div>

        <Button 
          size="sm"
          variant="bordered"
          color="primary"
          className="w-full dark:border-secondary font-medium text-lg dark:text-secondary"
          onClick={() => {
            if(currentEmail[0] === "" || typeof(currentEmail) !== "string"){
              return
            }else{
              if (emails.includes(currentEmail)) return;
              setEmails(emails => [...emails, currentEmail as string])
            }
          }}
        >
          Agregar Correo
        </Button>
      </div>

      <div className={`flex flex-col gap-2 ${type === "update" && "lg:max-w-[48%]"}`}>
        <div className="flex justify-stretch gap-2">
          <Input
            type="text"
            label="Zona"
            size="sm"
            isClearable
            defaultValue={companyData?.zone}
            isInvalid={errors.zone && true}
            errorMessage={errors?.zone?.message}
            {...register("zone", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />

          <Input
            type="text"
            label="Código"
            size="sm"
            isClearable
            defaultValue={companyData?.code}
            isInvalid={errors.code && true}
            errorMessage={errors?.code?.message}
            {...register("code", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />

          <Input
            type="text"
            label="Sección"
            size="sm"
            isClearable
            defaultValue={companyData?.section}
            isInvalid={errors.section && true}
            errorMessage={errors?.section?.message}
            {...register("section", {
              required: {
                value: true,
                message: "Este campo es requerido"
              }
              }
            )} 
          />
        </div>

        <Input
          type="text"
          size="sm"
          label="Estado"
          defaultValue={companyData?.address.state}
          isClearable
          isInvalid={errors.state && true}
          errorMessage={errors?.state?.message}
          {...register("state", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          })} 
        />

        <Input
          type="text"
          size="sm"
          label="Municipio"
          defaultValue={companyData?.address.municipality}
          isClearable
          isInvalid={errors.municipality && true}
          errorMessage={errors?.municipality?.message}
          {...register("municipality", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          })} 
        />

        <Input
          type="text"
          size="sm"
          label="Parroquia"
          defaultValue={companyData?.address.parish}
          isClearable
          isInvalid={errors.parish && true}
          errorMessage={errors?.parish?.message}
          {...register("parish", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          })} 
        />

        <Input
          type="text"
          size="sm"
          label="Dirección"
          defaultValue={companyData?.address.address}
          isClearable
          isInvalid={errors.address && true}
          errorMessage={errors?.address?.message}
          {...register("address", {
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          })} 
        />
      
        {type === "update" &&(
          <Input
            type="file"
            size="sm"
            labelPlacement="outside-left"
            label="Subir Logo"
            accept=".jpg, .jpeg, .png, .svg, .webp"
            {...register("img")} 
          />
        )}
      </div>


      {log.type && <LogMessage log={log} />}
      
      <div className='w-full flex justify-end'>
        <Button 
          size="sm"
          className={`mt-5 w-full ${type === "update" && "lg:w-80"} bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black`}
          type="submit"
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}
