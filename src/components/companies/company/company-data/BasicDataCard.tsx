"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCompany } from "@/hooks/useCompany"
import Image from "next/image"
import EditIcon from "@/components/icons/EditIcon"
import { Card, CardBody } from "@nextui-org/react"
import CloseIcon from "@/components/icons/CloseIcon"
import DeleteIcon from "@/components/icons/DeleteIcon"
import FormTemplate from "../../add-company/FormTemplate"
import DownloadIcon from "@/components/icons/DownloadIcon"

type CompanyInfoCardProps = {
  id: number;
}

type Data = {
  key: string,
  value: string | number | string[]
}

export default function BasicDataCard({ id }: CompanyInfoCardProps) {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const { companyData, company, img, email, getSingleCompany } = useCompany()
  
  useEffect(() => {
    getSingleCompany(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta empresa?")
    if(!confirm) return
    const res = await fetch(`/api/company/delete-company`, {
      method: "DELETE",
      body: JSON.stringify({id}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if(res.ok) router.push("/companies")
  }

  return (
    <Card className="w-full">
      <CardBody className="flex flex-col md:flex-row print:flex-row">
        <Image 
          src={img ? img : "/image-placeholder.webp"} 
          className="rounded-lg w-full print:max-w-[220px] md:max-w-[220px] md:max-h-[220px] print:max-h-[220px]"
          alt="Logo de la empresa" 
          width={200} 
          height={100}
          />
        <div className="w-full flex flex-col my-5 md:my-0 md:ml-5 print:my-0 print:ml-5 text-md">
          {edit ? (
            <FormTemplate type="update" className="flex flex-wrap gap-2" companyData={companyData} setEdit={setEdit} />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-primary dark:text-secondary">{company[0]?.value}</h2>
              {company.map((element : Data) => (
                element.key === "Correo Electrónico"
                  ? (
                    <div key={element.key} className="flex flex-wrap gap-2">
                      <p className="font-bold">{element.key}: </p>
                      {email.map((email : string) => <p key={email}>{email}, </p>)}
                    </div>
                  ) : (
                    <p key={element.key}><span className="font-bold">{element.key}: </span>{element.value}</p> 
                  )
              ))}
            </>
          )}
        </div>
        <div className="flex gap-2 justify-end items-start">
        <button className="print:hidden" onClick={() => window.print()}><DownloadIcon /></button>
        {!edit && <button className="print:hidden" onClick={() => setEdit(true)}><EditIcon /></button>}
        {edit && <button className="print:hidden" onClick={() => setEdit(false)}><CloseIcon /></button>}
        {!edit && <button className="print:hidden" onClick={handleDelete}><DeleteIcon /></button>}
        </div>
      </CardBody>
    </Card>
  )
}
