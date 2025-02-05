import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function notFound() {
  return (
    <main className="w-full h-[calc(100vh-7rem)] px-2 md:px-0 flex flex-col justify-center items-center gap-5 text-center">
      <h1 className="text-2xl text-primary dark:text-secondary font-bold">¡Algo salió mal!</h1>
      <p className="text-lg">La ruta a la cual intentas acceder no existe.</p>
      <Button size="sm" className="bg-primary dark:bg-secondary font-medium text-lg text-white dark:text-black flex">
        <Link href="/dashboard">
          Volver al Inicio
        </Link>
      </Button>
    </main>
  )
}
