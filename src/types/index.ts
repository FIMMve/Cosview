
// Usuarios y Sesiones
export type UserFormValues = {
  id?: number
  id_type?: string
  id_number: string
  username: string
  email: string
  phone_number: string
  password?: string
  confirm_password?: string
  role: string
}

export type UserData = Omit<UserFormValues, "password" | "confirmPassword" | "id_type">

export type Session = Pick<UserData, "email" | "role">

export type LoginValues = Pick<UserFormValues, "email" | "password">

// Empresas
export type CompanyFormValues = {
  name: string
  company_name: string
  phone_number: string
  email: string[]
  zone: string
  code: string
  rif: string
  nil: string
  ivss: string
  inces: string
  state: string
  municipality: string
  parish: string
  address: string
  economyc_activity: string
  section: string
  legal_representative_id?: number
  img?: string
}

export type CompanyData = Omit<CompanyFormValues, "state" | "municipality" | "parish" | "address"> & {
  address: {
    state: string
    municipality: string
    parish: string
    address: string
  }
  id: number
}

// Representante Legal
export type LegalRepresentative = {
  id: number
  name: string
  id_type?: string
  id_number: string
  phone_number: string
}

// Empleados
export type EmployeeFormValues = {
  company_id?: number
  name: string
  id_type?: string
  id_number: string
  gender: string
  phone_number: string
  route_format: boolean
  prevention_principles: boolean
  rutagrama: boolean
  position: string
  employeerRepresentative: boolean
  preventionRepresentative: boolean
  committee_delegate: boolean
  committee_second_postulate: boolean
  committee_elections: boolean
  birthdate?: string
  hire_date?: string
  termination_date?: string | null
}

export type EmployeeData = EmployeeFormValues & {
  id: number
  birthdate: string
  hire_date: string
  termination_date: string | null
  createdAt: string
  updatedAt: string
  committee_id?: number
  company_id: number
  status: string
}

// Comité
export type CommitteeData = {
  inpsasel_email?: string
  inpsasel_password?: string
  constitution?: string
  delegate_code?: string
  registratrion_date?: string
  inpsasel_report_date?: string
  transcription_date?: string
  ministry_labor_letter?: string
  call_date?: string
  application_date?: string
  election_date?: string
  mutual_agreement?: string
  designation_date?: string
  aceptance_date?: string
  formal_agreement?: string
  center_certificate?: string
  delegate_certificate?: string
  committee_certificate?: string
  createdAt: any
  updatedAt: any
}

// Otros
export type Links = {
  name: string
  href: string
}

export type Log = {
  type: string
  message: string
}