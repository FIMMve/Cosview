"use client"

import { dateFormatter } from '@/app/utils/dateFormatter';
import CloseIcon from '@/components/icons/CloseIcon';
import EditIcon from '@/components/icons/EditIcon';
import { useEvaluation } from '@/hooks/useEvaluation';
import { getLocalTimeZone, parseDate } from '@internationalized/date';
import { Card, CardBody, DateInput } from '@nextui-org/react';
import { useDateFormatter } from '@react-aria/i18n';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

type MainGraphicsProps = {
  companyId: number
}

export default function MainGraphics({ companyId } : MainGraphicsProps) {
  const { getEvaluation, evaluation } = useEvaluation()

  const [edit, setEdit] = useState(false)
  const [update, setUpdate] = useState<string>("")

  const [employeeRecord, setEmployeeRecord] = useState<any>()
  const [committee, setCommittee] = useState<any>()
  const [sysl, setSysl] = useState<any>()
  const [inspection, setInspection] = useState<any>()
  const [capacitation, setCapacitation] = useState<any>()

  const formatter = useDateFormatter({dateStyle: "medium"})

  const handleSubmit = async (date: string) => {
    const res = await fetch(`/api/evaluations/update-reference-date?query=${companyId}`, {
      method: "PUT",
      body: JSON.stringify({ reference_date: date}),
      headers: { "Content-Type" : "application/json" }
    })
    if(res.ok){
      setEdit(false)
      getEvaluation(companyId)
    }
  }

  useEffect(() => {
    getEvaluation(companyId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setEmployeeRecord(evaluation?.employee_record)
    setCommittee(evaluation?.committee)
    setSysl(evaluation?.sysl)
    setInspection(evaluation?.inspection)
    setCapacitation(evaluation?.capacitations)
  }, [evaluation])

  const options = {
    radar: {
      indicator: [
        { name: 'Expedientes', max: 1 },
        { name: 'Comité', max: 1 },
        { name: 'Carpetas', max: 1 },
        { name: 'Inspección', max: 1 },
        { name: 'Capacitación', max: 1 },
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [employeeRecord?.percentage, committee?.percentage, sysl?.percentage, inspection?.percentage, capacitation?.percentage],
            name: 'Allocated Budget'
          },
        ]
      }
    ]
  }
  
  return (
    <div className='w-full flex flex-col md:flex-row md:justify-center  print:flex-row print:justify-start gap-10'>
      {evaluation && (
        <>
          <Card className='w-full md:w-96 print:w-6/12'>
            <CardBody className='flex flex-col gap-2'>
              <h3>Actualizar documentos a partir de:</h3>
              <DateInput 
                size='sm'
                isReadOnly={!edit}
                defaultValue={evaluation?.reference_date ? parseDate(dateFormatter(evaluation.reference_date)) : null}
                onChange={e => setUpdate(formatter.format(e.toDate(getLocalTimeZone())))}
                onKeyDown={e => {
                  if(edit && e.key === "Enter") handleSubmit(update)
                }}
                endContent={
                  <button 
                    className='cursor-pointer print:hidden'
                    onClick={() => setEdit(!edit)}
                  >
                    {!edit 
                      ? <EditIcon />
                      : <CloseIcon />
                    }
                  </button>
                }
              />
              <div>
                <h3 className='font-bold my-2'>Categorías:</h3>
                <div className='flex flex-row justify-between'>
                  <div>
                    <p>Expedientes:</p>
                    <p>Comité:</p>
                    <p>SySL:</p>
                    <p>Inspecciones:</p>
                    <p>Capacitaciones:</p>
                  </div>
                  <div>
                    <p>{parseInt(`${employeeRecord?.percentage * 100}`)}%</p>
                    <p>{parseInt(`${committee?.percentage * 100}`)}%</p>
                    <p>{parseInt(`${sysl?.percentage * 100}`)}%</p>
                    <p>{parseInt(`${inspection?.percentage * 100}`)}%</p>
                    <p>{parseInt(`${capacitation?.percentage * 100}`)}%</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className='w-full md:w-96 print:w-6/12'>
            <ReactECharts option={options} />
          </div>
        </>
      )}

    </div>
  )
}
