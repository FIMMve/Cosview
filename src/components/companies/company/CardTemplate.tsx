"use client"

import EditIcon from "@/components/icons/EditIcon"
import { Card, CardBody } from "@nextui-org/react"
import CloseIcon from "@/components/icons/CloseIcon"

type CardTemplateProps = {
  children?: React.ReactNode
  title: string
  data: any
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  isEditable: boolean
}

export default function CardTemplate({ children, data, title, edit, setEdit, isEditable } : CardTemplateProps) {
  return (
    <Card>
      <CardBody className="flex flex-col md:flex-row p-2 print:overflow-hidden">
        <div className="w-full flex flex-col gap-1 md:mx-2 my-2 md:my-0">
          <h2 className="text-lg font-bold text-primary dark:text-secondary">{title}</h2>
          {data && edit ? (
            children
          ) : (
            <>
              {data.map((item : any) => (
                <p key={item.key} className={`text-md ${item.warning && "text-warning"}`}><span className={`font-bold ${!item.value && "text-danger"} ${item.value === 0 && "text-warning"}`}>{item.key && `${item.key}:`} </span>{item.value}</p>
              ))}
            </>
          )}
        </div>
        <div className="flex gap-2 justify-end items-start">
          {isEditable && (
            <>
              {!edit && <button className="print:hidden" onClick={() => setEdit(true)}><EditIcon /></button>}
              {edit && <button className="print:hidden" onClick={() => setEdit(false)}><CloseIcon /></button>}  
            </>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
