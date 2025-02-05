import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import type { CompanyData } from "@/types"

type CompanyCardProps = {
  company: CompanyData
}

export default function CompanyCard({ company } : CompanyCardProps) {
  return (
    <>
      <Link href={`companies/${company.id}`}>
        <Card key={company.id} className="w-[250px] pt-4 cursor-pointer hover:scale-105 transition-transform">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="w-full">
              <p className="text-tiny uppercase font-bold truncate">{company.company_name}</p>
              <small className="text-default-500 truncate">{company.rif}</small>
              <h4 className="font-bold text-large truncate">{company.name}</h4>
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            {company?.img ? (
              <Image
                alt="Logo de la empresa"
                className="object-cover rounded-xl h-[160px]"
                src={company.img}
                width={250}
                height={160}
              />
            ) : (
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-[160px]"
                src="/image-placeholder.webp"
                width={250}
                height={160}
              />
            )}
          </CardBody>
        </Card>
      </Link>
    </>
  )
}
