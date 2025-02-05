import { dateComparator } from "./dateFormatter"

export const calculatePercentage = (data: any, length: number, reference?: string) => {
  const values = Object.values(data)
  
  const percentage = values.reduce((accumulator: number, currentValue) => {
    let transformedValue = 0

    if(reference){
      if(currentValue === reference) transformedValue = 1
      if(currentValue !== reference) transformedValue = 0

      return accumulator + transformedValue
    }

    if(currentValue === 3) transformedValue = 1
    if(currentValue === 1) transformedValue = 0.5
    if(currentValue === 0) transformedValue = 0

    return accumulator + transformedValue
  }, 0)

  return percentage / length
} 

export const calculatePunctuation = (data: number, length: number): number => {
  const averagePunctuation = data / length

  if(averagePunctuation === 1) return 3
  if(averagePunctuation < 1 && averagePunctuation > 0) return 1
  
  return 0
}

export const calculateDatePunctuation = (date1: any, date2: any) => {
  const comparator = dateComparator(date1, date2)
  if(comparator === null) return 0
  if(comparator === true) return 1
  return 3
}