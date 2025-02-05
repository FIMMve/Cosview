import { useContext } from "react";
import { CompanyContext } from "@/context/CompanyContext";

export const useCompany = () => {
  const context = useContext(CompanyContext);
  return context
}