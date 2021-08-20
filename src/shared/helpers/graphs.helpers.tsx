export const statistics = (response: any) => {
  const date = new Date(Date.now())
  let dates: string[] = []
  let dayTempMatrix: any[][] = []
  for (let i = 0; i < 5; i++) {
    let newDate = new Date()
    newDate.setDate(date.getDate() + i)
    dates.push(newDate.toISOString().split('T')[0])
    dayTempMatrix.push([])
  }
  console.log(dates)
  response.data.list.map((x: any) => {
    if (x.dt_txt.split(' ')[0] == dates[0]) {
      dayTempMatrix[0].push(x)
    }
    if (x.dt_txt.split(' ')[0] == dates[1]) {
      dayTempMatrix[1].push(x)
    }
    if (x.dt_txt.split(' ')[0] == dates[2]) {
      dayTempMatrix[2].push(x)
    }
    if (x.dt_txt.split(' ')[0] == dates[3]) {
      dayTempMatrix[3].push(x)
    }
    if (x.dt_txt.split(' ')[0] == dates[4]) {
      dayTempMatrix[4].push(x)
    }
  })

  return dayTempMatrix
}

export const tempPerDay = (dailyForecast: any, type: string) => {
  let count = 1
  if (dailyForecast.length > 0) {
    let value = dailyForecast.reduce((carrier: any, response: any) => {
      if (type == 'max' && carrier < response.main.temp) {
        carrier = response.main.temp
      }
      if (type == 'min' && carrier > response.main.temp) {
        carrier = response.main.temp
      }
      if (type == 'avrg') {
        count++
        carrier += response.main.temp
      }
      return carrier
    }, dailyForecast[0].main.temp)
    return type == 'avrg' ? value / count : value
  } else return 0
}

export const valuesForGraphs = (dayTempList: any, type: string) => {
  let value: any[] = [
    { x: 'Day 1', y: 15 },
    { x: 'Day 2', y: 22 },
    { x: 'Day 3', y: 32 },
    { x: 'Day 4', y: 31 },
    { x: 'Day 5', y: 29 },
  ]
  let count = -1
  dayTempList.map((dayList: any) => {
    count++
    return (value[count].y = tempPerDay(dayList, type))
  })
  return value
}
