import { GetZipCodesByCounty } from '../js/twzipcode-data.js'

export const SelectDistrictTownshipStyle = (text) => {
  const list = []
  GetZipCodesByCounty(text).forEach(county => {
    list.push({
      type: 'button',
      style: 'link',
      height: 'sm',
      action: {
        type: 'message',
        label: county.city,
        text: county.city
      }
    })
  })
  list.push(
    {
      type: 'button',
      style: 'link',
      height: 'sm',
      action: {
        type: 'message',
        label: '重置',
        text: '重置'
      }
    }
  )
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '請選擇區鄉鎮',
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
