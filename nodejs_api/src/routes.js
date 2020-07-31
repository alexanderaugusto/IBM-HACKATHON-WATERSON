const express = require('express')
const assistant = require('./utils/assistent')
const axios = require('axios')
const btoa = require('btoa')
const request = require('request')
const { getDate, getEveryScore } = require('./utils/util')

const routes = express.Router()

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
}


routes.get('/assistent', (req, res) => {
  assistant.session()
    .then(sessionid => {
      console.log('Successfully connected to Watson Assistant');
      return res.json("Ok")
    })
    .catch(err => {
      const msg = 'Failed to connect to Watson Assistant';
      console.error(msg);
      console.error(err);
      return res.status(400).json("Deu ruim")
    })
})

routes.get('/assistent/session', (req, res) => {
  assistant.session()
    .then(session_id => res.send({ session_id }))
    .catch(err => handleError(res, err))
})

routes.post('/assistent/message', (req, res) => {
  const { text = "", session_id } = req.body

  assistant.message(text, session_id)
    .then(result => {
      const message = result.generic[0].text

      res.json({ message })
    })
    .catch(err => handleError(res, err));
})

routes.get('/get-iam-token', async (req, res) => {
  const IBM_Cloud_IAM_uid = "bx";
  const IBM_Cloud_IAM_pwd = "bx";

  const options = {
    url: "https://iam.bluemix.net/oidc/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd)
    },
    body: "apikey=" + process.env.WATSON_MACHINE_LEARNING_API_KEY + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
  };

  await request.post(options, function (error, response, body) {
    const iam_token = JSON.parse(body)["access_token"]

    return res.json({ iam_token })
  })
})

routes.post('/floods/weather-conditions/current', async (req, res) => {
  const { latitude, longitude, iam_token } = req.body

  const { date, time } = getDate()

  const weatherData = { date, lat: latitude, lon: longitude, time }

  const weather = await axios.post(process.env.CLOUD_FUNCTION, weatherData)
  if (!weather) {
    return res.status(400).json({ error: "Data mal formatted." })
  }

  const currentWeather = (weather.data.data.filter((item) => item.date === date && item.uvIndex === 0))[0]

  const { temperature, humidity, windSpeed, precipIntensity } = currentWeather

  const config = {
    headers: {
      "Authorization": "Bearer" + iam_token,
      "Content-Type": "application/json",
      "ML-Instance-ID": process.env.WATSON_MACHINE_LEARNING_INSTANCE_ID
    }
  }

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

      return res.json({ ...currentWeather, flood_score })
    })
    .catch(err => res.status(500).json("Sorry!! Internal server error."))
})

routes.post('/floods/weather-conditions/every', async (req, res, next) => {
  const { latitude, longitude, iam_token } = req.body

  const { date, time } = getDate()

  const weatherData = { date, lat: latitude, lon: longitude, time }

  const weather = await axios.post(process.env.CLOUD_FUNCTION, weatherData)
  if (!weather) {
    return res.status(400).json({ error: "Data mal formatted." })
  }

  const config = {
    headers: {
      "Authorization": "Bearer" + iam_token,
      "Content-Type": "application/json",
      "ML-Instance-ID": process.env.WATSON_MACHINE_LEARNING_INSTANCE_ID
    }
  }

  getEveryScore(weather.data.data, latitude, longitude, config, (newData) => {
    return res.json(newData)
  })
})

module.exports = routes
