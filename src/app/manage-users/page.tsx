"use client"

import UsersList from "@/components/manage-users/UsersList"
import CreateUserForm from "@/components/manage-users/CreateUserForm"

export default function ManageUsers() {
  return (
    <main className='w-full my-5'>
      <h1 className=' text-2xl text-primary dark:text-secondary font-bold'>Administrar Usuarios</h1>

      <UsersList />
      <CreateUserForm />
    </main>
  )
}
