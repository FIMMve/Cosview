"use client"

import { createContext, useState } from "react";

type EvaluationContextProps = {
  evaluation: any
  getEvaluation: (id?: number) => Promise<any>
}

type EvaluationProviderProps = {
  children: React.ReactNode
}

export const EvaluationContext = createContext<EvaluationContextProps>(null!);

export const EvaluationProvider = ({children} : EvaluationProviderProps) => {
  const [evaluation, setEvaluation] = useState<any>()

  const getEvaluation = async (id?: number) => {
    if(id){
      const res = await fetch(`/api/evaluations/get-evaluation?query=${id}`)
      if(res.ok){
        const data = await res.json()
        setEvaluation(data.message)
        return data.message
      }
    }

    if(!id){
      const res = await fetch(`/api/evaluations/get-evaluation`)
      if(res.ok){
        const data = await res.json()
        setEvaluation(data.message)
        return data.message
      }
    }
  }

  return(
    <EvaluationContext.Provider
      value={{
        evaluation,
        getEvaluation
      }}
    >
      {children}
    </EvaluationContext.Provider>
  )
}
