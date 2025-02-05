const monthFormatter = (month: string) : number => {
  const monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  return monthArray.indexOf(month.toLocaleLowerCase()) + 1
}

export const dateFormatter = (date: string): string => {
  const formatedDate = date.replaceAll(",", "")
  const splitedDate = formatedDate.split(" ")
  const month = monthFormatter(splitedDate[0])
  const monthFormated = month < 10 ? `0${month}` : month
  const dayFormated = splitedDate[1].length < 2 ? `0${splitedDate[1]}` : splitedDate[1]

  const formattedDate = `${splitedDate[2]}-${monthFormated}-${dayFormated}`

  return formattedDate
}

export const dateComparator = (date1: any, date2: any): boolean | null => {
  if(date1 === "" || date1 === undefined || date1 === null) return null

  const splitedDate1 = date1.split(" ")
  const parsedDate1 = splitedDate1.map((date: any, index: number) => {
    if(index === 1){
      return monthFormatter(date)
    }
    return +date
  })

  if(date2 === "" || date2 === undefined || date2 === null) return false

  const splitedDate2 = date2.split(" ")
  const parsedDate2 = splitedDate2.map((date: any, index: number) => {
    if(index === 1){
      return monthFormatter(date)
    }
    return +date
  }) 

  if(parsedDate1[2] < parsedDate2[2]) return true
  if(parsedDate1[2] > parsedDate2[2]) return false

  if(parsedDate1[1] < parsedDate2[1]) return true
  if(parsedDate1[1] > parsedDate2[1]) return false

  if(parsedDate1[0] < parsedDate2[0]) return true
  if(parsedDate1[0] > parsedDate2[0]) return false

  return true
}

export const calculateTranscurredYears = (date: string) : number => {
  const splitedDate = date.split(" ")
  const day = +splitedDate[0]
  const month = monthFormatter(splitedDate[1]) - 1
  const year = +splitedDate[2]
  const dateObject = new Date(year, month - 1, day)
  const currentDate = new Date()

  let numberOfYears = currentDate.getFullYear() - dateObject.getFullYear()

  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  if(currentMonth < month - 1 || (currentMonth === month - 1 && currentDay < day)) numberOfYears--

  return numberOfYears
}