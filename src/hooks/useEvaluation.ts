import { useContext } from "react";
import { EvaluationContext } from "@/context/EvaluationContext";

export const useEvaluation = () => {
  const context = useContext(EvaluationContext);
  return context
}