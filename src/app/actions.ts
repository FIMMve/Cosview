'use server'

import { redirect } from 'next/navigation'
 
export async function loginSucceeded(){
  redirect("/dahsboard")
}