import { useContext } from "react";
import { UsersListContext } from "@/context/UsersListContext";

export const useUsersList = () => {
  const context = useContext(UsersListContext);
  return context
}