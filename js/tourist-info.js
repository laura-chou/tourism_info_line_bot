export const TouristInfoStyle = (selectCounty, selectCity) => {
  const text = selectCounty + selectCity
  let offsetStart = '105px'
  if (text.length === 7) offsetStart = '95px'
  if (text.length === 5) offsetStart = '110px'
  const url = `${process.env.APIURL}/type/` + encodeURI(`${selectCounty}/${selectCity}`)
  return {
    type: 'bubble',
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1698247032/LineRobot/search.jpg',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '80:30',
          position: 'relative'
        },
        {
          type: 'text',
          color: '#ffffff',
          weight: 'bold',
          contents: [],
          text: text,
          position: 'absolute',
          offsetTop: '49px',
          offsetStart: offsetStart
        }
      ],
      position: 'relative'
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'link',
          height: 'md',
          action: {
            type: 'uri',
            label: '餐飲',
            uri: url.replace('type', 'food-info')
          },
          color: '#ffffff'
        },
        {
          type: 'button',
          style: 'link',
          height: 'md',
          action: {
            type: 'uri',
            label: '景點',
            uri: url.replace('type', 'tourist-spots')
          },
          color: '#ffffff'
        },
        {
          type: 'button',
          style: 'link',
          height: 'md',
          action: {
            type: 'uri',
            label: '旅館民宿',
            uri: url.replace('type', 'hotel-info')
          },
          color: '#ffffff'
        },
        {
          type: 'button',
          style: 'link',
          height: 'md',
          action: {
            type: 'message',
            label: '重置',
            text: '重置'
          },
          color: '#ffffff'
        }
      ],
      flex: 0
    },
    styles: {
      body: {
        backgroundColor: '#000000'
      },
      footer: {
        backgroundColor: '#000000'
      }
    }
  }
}
