import { useContext } from "react";
import { SyslContext } from "@/context/SyslContext";

export const useSysl = () => {
  const context = useContext(SyslContext);
  return context
}