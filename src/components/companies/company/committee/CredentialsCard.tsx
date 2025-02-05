"use client"

import CardTemplate from "../CardTemplate"
import { useEffect, useState } from "react"
import UpdateCredentialsForm from "./UpdateCredentialsForm"

type CredentialsCardProps = {
  companyId: number
}

export default function CredentialsCard({companyId} : CredentialsCardProps) {
  const [credentials, setCredentials] = useState([{key: "", value: ""}])
  const [edit, setEdit] = useState(false)

  const getCredentials = async (id: number) => {
    const res = await fetch(`/api/committee/get-committee?query=${id}&data=credentials`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    const data = await res.json()
    setCredentials([
      {key: "Correo INPSASEL", value: data.message.inpsasel_email},
      {key: "Clave Web INPSASEL", value: data.message.inpsasel_password}
    ])
  }

  useEffect(() => {
    getCredentials(companyId)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="w-full">
      <CardTemplate
        title="Credenciales INPSASEL"
        isEditable={true}
        data={credentials}
        edit={edit}
        setEdit={setEdit}
      >
        <UpdateCredentialsForm companyId={companyId} getCredentials={getCredentials} credentials={credentials} setEdit={setEdit}/>
      </CardTemplate>
    </div>
  )
}
