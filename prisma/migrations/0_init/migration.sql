-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "id_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT[],
    "zone" TEXT NOT NULL,
    "code" TEXT,
    "img" TEXT,
    "legal_representative_id" INTEGER NOT NULL,
    "rif" TEXT NOT NULL,
    "nil" TEXT NOT NULL,
    "ivss" TEXT NOT NULL,
    "inces" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "economyc_activity" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "evaluations" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalRepresentative" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalRepresentative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeRecord" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "committee_id" INTEGER,
    "name" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "position" TEXT[],
    "birthdate" TIMESTAMP(3) NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "termination_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "center_certificate" TEXT NOT NULL,
    "committee_certificate" TEXT NOT NULL,
    "delegate_certificate" TEXT NOT NULL,
    "inpsasel_email" TEXT NOT NULL,
    "inpsasel_password" TEXT NOT NULL,
    "constitution" TEXT NOT NULL,
    "registratrion_date" TEXT NOT NULL,
    "inpsasel_report_date" TEXT NOT NULL,
    "transcription_date" TEXT NOT NULL,
    "ministry_labor_letter" TEXT NOT NULL,
    "call_date" TIMESTAMP(3) NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL,
    "election_date" TIMESTAMP(3) NOT NULL,
    "mutual_agreement" TIMESTAMP(3) NOT NULL,
    "designation_date" TIMESTAMP(3) NOT NULL,
    "aceptance_date" TIMESTAMP(3) NOT NULL,
    "formal_agreement" TIMESTAMP(3) NOT NULL,
    "delegate_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sysl" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "sysl_program" TIMESTAMP(3) NOT NULL,
    "participation_approval_minutes" TEXT NOT NULL,
    "signed_program" BOOLEAN NOT NULL,
    "communityContract" BOOLEAN NOT NULL,
    "serviceCertificate" BOOLEAN NOT NULL,
    "inspectorsCertificate" BOOLEAN NOT NULL,
    "serviceOrganigram" BOOLEAN NOT NULL,
    "standards" BOOLEAN NOT NULL,
    "syslPolicies" BOOLEAN NOT NULL,
    "jobAnalysis" BOOLEAN NOT NULL,
    "interventionProtocol" BOOLEAN NOT NULL,
    "accidentRate" TEXT NOT NULL,
    "morbidityRate" TEXT NOT NULL,
    "occupational_doctor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sysl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prl" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "prl" TEXT,
    "first_shift" TEXT,
    "second_shift" TEXT,
    "cultural_component" JSONB,
    "sports_component" JSONB,
    "recreational_component" JSONB,
    "formation_component" JSONB,
    "familiar_component" JSONB,
    "active_pause" JSONB[],
    "brain_gymnastics" JSONB,
    "integration_dynamics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billboard" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "committee_registration" INTEGER NOT NULL,
    "service_registration" INTEGER NOT NULL,
    "sysl_policies" INTEGER NOT NULL,
    "occupational_medical" INTEGER NOT NULL,
    "statistics" INTEGER NOT NULL,
    "informative_topics" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "inspection_date" TIMESTAMP(3) NOT NULL,
    "inspector_name" TEXT NOT NULL,
    "inspection_notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirstAid" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "inspection_id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstAid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricalPrevention" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "inspection_id" INTEGER NOT NULL,
    "emergency_lights" INTEGER NOT NULL,
    "operative_lights" INTEGER NOT NULL,
    "electric_generator" BOOLEAN NOT NULL,
    "solar_panel" BOOLEAN NOT NULL,
    "emergency_batteries" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectricalPrevention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signaling" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "inspection_id" INTEGER NOT NULL,
    "emergency_exit" BOOLEAN NOT NULL,
    "electric_risk" BOOLEAN NOT NULL,
    "fire_extinguisher" BOOLEAN NOT NULL,
    "first_aid_kit" BOOLEAN NOT NULL,
    "area_signaling" BOOLEAN NOT NULL,
    "danger_drop" BOOLEAN NOT NULL,
    "no_smoking" BOOLEAN NOT NULL,
    "weapons_prohibition" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Signaling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FireExtinguisher" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "inspection_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FireExtinguisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacitation" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "dynamics" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capacitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_number_key" ON "User"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Company_phone_number_key" ON "Company"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_legal_representative_id_key" ON "Company"("legal_representative_id");

-- CreateIndex
CREATE UNIQUE INDEX "LegalRepresentative_id_number_key" ON "LegalRepresentative"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "LegalRepresentative_phone_number_key" ON "LegalRepresentative"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRecord_id_number_key" ON "EmployeeRecord"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRecord_phone_number_key" ON "EmployeeRecord"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_company_id_key" ON "Committee"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sysl_company_id_key" ON "Sysl"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Prl_company_id_key" ON "Prl"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Billboard_company_id_key" ON "Billboard"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_company_id_key" ON "Inspection"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "FirstAid_company_id_key" ON "FirstAid"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "FirstAid_inspection_id_key" ON "FirstAid"("inspection_id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectricalPrevention_company_id_key" ON "ElectricalPrevention"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectricalPrevention_inspection_id_key" ON "ElectricalPrevention"("inspection_id");

-- CreateIndex
CREATE UNIQUE INDEX "Signaling_company_id_key" ON "Signaling"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "Signaling_inspection_id_key" ON "Signaling"("inspection_id");

-- CreateIndex
CREATE UNIQUE INDEX "FireExtinguisher_company_id_key" ON "FireExtinguisher"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "FireExtinguisher_inspection_id_key" ON "FireExtinguisher"("inspection_id");

-- CreateIndex
CREATE UNIQUE INDEX "Capacitation_company_id_key" ON "Capacitation"("company_id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_legal_representative_id_fkey" FOREIGN KEY ("legal_representative_id") REFERENCES "LegalRepresentative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRecord" ADD CONSTRAINT "EmployeeRecord_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRecord" ADD CONSTRAINT "EmployeeRecord_committee_id_fkey" FOREIGN KEY ("committee_id") REFERENCES "Committee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sysl" ADD CONSTRAINT "Sysl_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prl" ADD CONSTRAINT "Prl_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billboard" ADD CONSTRAINT "Billboard_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstAid" ADD CONSTRAINT "FirstAid_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstAid" ADD CONSTRAINT "FirstAid_inspection_id_fkey" FOREIGN KEY ("inspection_id") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalPrevention" ADD CONSTRAINT "ElectricalPrevention_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalPrevention" ADD CONSTRAINT "ElectricalPrevention_inspection_id_fkey" FOREIGN KEY ("inspection_id") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signaling" ADD CONSTRAINT "Signaling_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signaling" ADD CONSTRAINT "Signaling_inspection_id_fkey" FOREIGN KEY ("inspection_id") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireExtinguisher" ADD CONSTRAINT "FireExtinguisher_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireExtinguisher" ADD CONSTRAINT "FireExtinguisher_inspection_id_fkey" FOREIGN KEY ("inspection_id") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacitation" ADD CONSTRAINT "Capacitation_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

