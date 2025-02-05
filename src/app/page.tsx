import LogInForm from "@/components/login/LogInForm";
import Image from "next/image";

export default function Home() {

  return (
    <main className="w-full h-[calc(100vh-7rem)] px-2 md:px-0 flex flex-col justify-center items-center">

    <Image 
      src="login-image-light.svg"
      alt="Login Image"
      width={200}
      height={200}
      className="h-auto block dark:hidden mb-8"
    />

    <Image 
      src="login-image-dark.svg"
      alt="Login Image"
      width={200}
      height={200}
      className="h-auto hidden dark:block mb-8"
    />

    <LogInForm />
    </main>
  )
}
