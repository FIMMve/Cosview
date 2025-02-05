import BasicDataCard from "@/components/companies/company/company-data/BasicDataCard"

import MainGraphics from "@/components/companies/company/evaluations/dashboard-graphics/MainGraphics"

import LegalRepresentativeData from "@/components/companies/company/legal-representative/LegalRepresentativeData"
import EmployeeList from "@/components/companies/company/employee/EmployeeList"
import MainPosition from "@/components/companies/company/employee/MainPositions"

import CommitteeData from "@/components/companies/company/committee/CommitteeData"
import CertificateCards from "@/components/companies/company/committee/CertificateCards"
import CredentialsCard from "@/components/companies/company/committee/CredentialsCard"

import SySLData from "@/components/companies/company/sysl/SySLData"
import PRLData from "@/components/companies/company/sysl/PRLData"

import { EmployeeProvider } from "@/context/EmployeeContext"
import { EvaluationProvider } from "@/context/EvaluationContext"
import { SyslProvider } from "@/context/SyslContext"
import FolderData from "@/components/companies/company/sysl/FolderData"
import InspectionData from "@/components/companies/company/inspections/inspection/InspectionData"
import FirstAidsData from "@/components/companies/company/inspections/first-aids/FirstAidsData"
import FEList from "@/components/companies/company/inspections/fire-extinguisher/FEList"
import EPData from "@/components/companies/company/inspections/electrical-prevention/EPData"
import SignalingData from "@/components/companies/company/inspections/signaling/SignalingData"
import CapacitationsList from "@/components/companies/company/capacitations/CapacitationsList"

type CompanyProps = {
  params: Promise<{id: number}>
}

export default async function Company({ params } : CompanyProps) {
  const companyId = (await params).id
  return (
    <article className="w-full flex flex-col gap-5">
      <BasicDataCard id={companyId} />

      <section>
        <h2 className="text-2xl print:mt-0 mt-20 mb-5 font-bold text-primary dark:text-secondary">Evaluaciones</h2>

        <div className="flex flex-col md:flex-row print:flex-row items-stretch justify-items-stretch">
          <EvaluationProvider>
            <MainGraphics companyId={companyId} />
          </EvaluationProvider>
        </div>        
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-2xl print:mt-0 mt-20 mb-5 font-bold text-primary dark:text-secondary">Inspecciones</h2>

        <InspectionData companyId={companyId} />

        <FEList companyId={companyId} />

        <FirstAidsData companyId={companyId} />

        <div className="w-full mb-2 flex flex-col md:grid print:grid md:grid-cols-2 print:grid-cols-2 gap-5 justify-items-stretch items-stretch">
          <SignalingData companyId={companyId} />

          <EPData companyId={companyId} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-2xl print:mt-0 mt-20 mb-5 font-bold text-primary dark:text-secondary">Capacitaciones</h2>

        <CapacitationsList companyId={companyId} />

      </section>

      <EmployeeProvider>
        <section>
          <h2 className="text-2xl mt-20 print:mt-0 mb-5 font-bold text-primary dark:text-secondary">Expedientes</h2>

          <div className="w-full mb-2 flex flex-col md:grid print:grid md:grid-cols-2 lg:grid-cols-4 print:grid-cols-4 gap-5 justify-items-stretch items-stretch">
            <LegalRepresentativeData id={companyId} />

            <MainPosition title="Gerente" />
            <MainPosition title="Delegado de Prevención" />
            <MainPosition title="Representante Patronal" />
          </div>

          <EmployeeList companyId={companyId}/>
        </section>

        <section>
          <h2 className="text-2xl mt-20 print:mt-0 mb-5 font-bold text-primary dark:text-secondary">Comité</h2>

          <div className="w-full flex flex-col md:grid print:grid md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-5 justify-items-stretch items-stretch">
            <MainPosition title="Delegado de Comité" />
            <MainPosition title="Segundo Postulado de Comité" />
            <MainPosition title="Comisión Electoral" />
          </div>
        </section>
      </EmployeeProvider>

      <section className="w-full flex flex-col md:flex-row print:flex-row gap-5 items-center">
        <div className="w-full">
          <EvaluationProvider>
            <CommitteeData companyId={companyId}/>
          </EvaluationProvider>
        </div>


        <div className="w-full md:w-auto print:w-auto flex flex-col items-center gap-2">
          <CredentialsCard companyId={companyId} />
          
          <CertificateCards companyId={companyId} title="Certificado del Centro" />
          <CertificateCards companyId={companyId} title="Certificado del Comité" />
          <CertificateCards companyId={companyId} title="Certificado del Delegado" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl mt-20 print:mt-0 mb-5 font-bold text-primary dark:text-secondary">Seguridad y Salud Laboral</h2>
        <SyslProvider>
          <EvaluationProvider>
            <div className="w-full flex flex-col md:grid print:grid md:grid-cols-2 print:grid-cols-2 gap-5 justify-center">
              <SySLData companyId={companyId} />
              <PRLData companyId={companyId} />
            </div>
              <FolderData companyId={companyId} />
          </EvaluationProvider>
        </SyslProvider>
      </section>

    </article>
  )
}
