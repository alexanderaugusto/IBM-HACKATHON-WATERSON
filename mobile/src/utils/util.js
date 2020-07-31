const formatTemp = (temp) => {
  return parseInt(temp, 10) + "°"
}

const formatScore = (score) => {
  return Math.abs(score).toFixed(2).toString() + "%"
}

const formatTime = (time) => {
  return time
}

const formatWeatherData = (data) => {
  const icons = {
    rain: "cloud-rain",
    cloudy: "cloud-meatball",
    "clear-night": "moon",
    "partly-cloudy-night": "cloud-moon",
    "clear-day": "sun",
    "partly-cloudy-day": "cloud-sun"
  }

  return { ...data, icon: icons[data.icon] }
}

const formatEveryWeatherData = (data) => {
  const newData = []

  data.forEach((item, index) => {
    const newData2 = []

    item.data.forEach((value, key) => {
      value = formatWeatherData(value)

      newData2.push({ ...value, id: key })
    })

    newData.push({ ...item, data: newData2, id: index })
  })

  return newData
}

const createRows = (data, columns) => {
  const array = data.filter(item => item)

  const rows = Math.floor(array.length / columns)
  let lastRowElements = array.length - rows * columns
  while (lastRowElements !== columns) {
    array.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements++;
  }

  return array;
}

export {
  formatTemp,
  formatScore,
  formatWeatherData,
  formatEveryWeatherData,
  createRows,
  formatTime
}