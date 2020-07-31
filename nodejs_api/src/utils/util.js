const axios = require('axios')

const getDate = () => {
  const now = new Date()

  let day = now.getDate()
  let month = now.getMonth() + 1
  const year = now.getFullYear()
  const hour = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  day = day >= 10 ? day : ("0" + day)
  month = month >= 10 ? month : ("0" + month)

  const date = year + "-" + month + "-" + day
  const time = hour + ":" + minutes + ":" + seconds

  return { date, time }
}

const getEveryScore = async (data, latitude, longitude, config, callback) => {
  let newData = {}
  let newDataArray = []

  await data.map(async (item) => {
    const { temperature, humidity, windSpeed, precipIntensity } = item

    const floodData = {
      "input_data": [
        {
          "fields": ["latitude", "longitude", "chuva", "temp", "umidade", "vento"],
          "values": [[latitude, longitude, precipIntensity, temperature, humidity, windSpeed]]
        }
      ]
    }

    await axios.post(process.env.WATSON_MACHINE_LEARNING_URL, floodData, config)
      .then(response => {
        const flood_score = response.data.predictions[0].values[0][0]

        if (!newData[item.date]) {
          newData[item.date] = [{ ...item, flood_score }]
        } else {
          newData[item.date] = [...newData[item.date], { ...item, flood_score }]
        }
        newDataArray.push({ ...item, flood_score })

        if (data.length === newDataArray.length) {
          let dataToReturn = []

          Object.keys(newData).forEach((key) => {
            dataToReturn.push({
              date: key,
              data: newData[key]
            })
          })

          callback(dataToReturn)
        }
      })
      .catch(err => {
        return console.log(err)
      })
  })
}

module.exports = {
  getDate,
  getEveryScore
}