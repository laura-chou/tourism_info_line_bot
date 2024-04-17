import linebot from 'linebot'
import dotenv from 'dotenv'

import { GetMatchInfo, HaveCounty, HaveCity, GetDataBySelectCity, GetCountyName, IsSelectCorrect } from './js/twzipcode-data.js'
import { SelectCityCountyStyle } from './js/city-county.js'
import { SelectDistrictTownshipStyle } from './js/district-township.js'
import { SuggestOptionsStyle } from './js/suggest-options.js'
import { TouristInfoStyle } from './js/tourist-info.js'
import { ParseMessage } from './js/parse-message.js'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

let selectCounty = ''
let selectCity = ''
let step = 1

bot.on('message', async (event) => {
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

    if (IsSelectCorrect(selectCounty, selectCity) && !isMoreCounty) {
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

  event.reply({
    type: 'flex',
    altText: '查詢結果',
    contents: {
      type: 'carousel',
      contents: style
    }
  })
})

bot.listen('/', process.env.PORT, async () => {
  console.log('機器人已啟動')
})
