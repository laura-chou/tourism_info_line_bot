import { GetMatchInfo } from '../js/twzipcode-data.js'

export const SuggestOptionsStyle = (text) => {
  const list = []
  GetMatchInfo(text).forEach(data => {
    list.push({
      type: 'text',
      text: data.county,
      align: 'center',
      weight: 'bold',
      margin: '10px'
    })
    data.cities.forEach(city => {
      list.push({
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'message',
          label: city,
          text: city
        }
      })
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
    })
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '您想找的是？',
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
