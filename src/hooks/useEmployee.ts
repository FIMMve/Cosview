import { useContext } from "react";
import { EmployeeContext } from "@/context/EmployeeContext";

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  return context
}