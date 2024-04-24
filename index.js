import express from 'express'
import cors from 'cors'
import * as line from '@line/bot-sdk'
import dotenv from 'dotenv'

import { GetMatchInfo, HaveCounty, HaveCity, GetDataBySelectCity, GetCountyName, IsSelectCorrect } from './js/twzipcode-data.js'
import { SelectCityCountyStyle } from './js/city-county.js'
import { SelectDistrictTownshipStyle } from './js/district-township.js'
import { SuggestOptionsStyle } from './js/suggest-options.js'
import { TouristInfoStyle } from './js/tourist-info.js'
import { ParseMessage } from './js/parse-message.js'

dotenv.config()

const app = express()
const whitelist = process.env.WHITELIST.split(',')

app.use(cors({
  origin (origin, callback) {
    console.log(origin)
    if (process.env.ALLOW_CORS === 'true') {
      callback(null, true)
    } else if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'), false)
    }
  },
  credentials: true
}))

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}

const client = new line.messagingApi.MessagingApiClient(config)

let selectCounty = ''
let selectCity = ''
let step = 1

app.get('/', (req, res) => {
  res.status(200).send('')
})

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

function handleEvent (event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  const message = ParseMessage(event.message.text)
  const style = []
  if (message !== '重置') {
    let isMoreCounty = false
    if (HaveCity(message)) {
      const data = GetDataBySelectCity(message)
      if (data.result < 2) {
        selectCounty = data.county
      } else {
        isMoreCounty = true
        step = 1
      }
      selectCity = data.city
    }

    if (HaveCounty(message)) {
      selectCounty = GetCountyName(message)
      step = 2
    }

    if (isMoreCounty) {
      step = 1
    }

    if (IsSelectCorrect(selectCounty, selectCity)) {
      step = 3
    }

    if (!HaveCity(message) &&
        !HaveCounty(message) &&
        GetMatchInfo(message).length > 0) {
      step = 4
    }
  } else {
    step = 1
    selectCounty = ''
    selectCity = ''
  }

  switch (step) {
    case 1:
      style.push(SelectCityCountyStyle(message))
      break
    case 2:
      style.push(SelectDistrictTownshipStyle(selectCounty))
      break
    case 3:
      style.push(TouristInfoStyle(selectCounty, selectCity))
      break
    case 4:
      style.push(SuggestOptionsStyle(message))
      break
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'flex',
      altText: '查詢結果',
      contents: {
        type: 'carousel',
        contents: style
      }
    }]
  })
}

app.listen(process.env.PORT || 3000, () => {
  console.log('start')
})
