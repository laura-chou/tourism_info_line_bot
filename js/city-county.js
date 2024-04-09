import { GetAllCounty, GetZipCodesByCity } from '../js/twzipcode-data.js'

export const SelectCityCountyStyle = (text) => {
  const list = []
  const filterCounty = GetZipCodesByCity(text)
  if (filterCounty.length > 0) {
    filterCounty.forEach(county => {
      list.push({
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'message',
          label: county.county,
          text: county.county
        }
      })
    })
  } else {
    GetAllCounty().forEach(county => {
      list.push({
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'message',
          label: county.name,
          text: county.name
        }
      })
    })
  }
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '請選擇縣市',
          weight: 'bold',
          size: 'lg'
        }
      ],
      alignItems: 'center'
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: list
    }
  }
}
