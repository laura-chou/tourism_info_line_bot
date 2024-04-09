import twzipcode from 'twzipcode-data'
import { ReplaceText } from './parse-message.js'

var data = twzipcode.default()
const counties = data.counties
const zipcodes = data.zipcodes

export const HaveCounty = (selectCounty) => {
  return counties.some(county => {
    return county.name.includes(selectCounty)
  })
}

export const GetAllCounty = () => {
  return counties
}

export const GetCountyName = (selectCounty) => {
  const county = counties.find(county => county.name.includes(selectCounty))
  return county.name
}

export const HaveCity = (selectCity) => {
  return zipcodes.some(zipcode => {
    return zipcode.city.includes(selectCity)
  })
}

export const GetDataBySelectCity = (selectCity) => {
  const zipcode = zipcodes.find(zipcode => zipcode.city.includes(selectCity))
  return {
    county: zipcode.county,
    city: zipcode.city,
    result: zipcodes.filter(zipcode => zipcode.city.includes(selectCity)).length
  }
}

export const IsSelectCorrect = (selectCounty, selectCity) => {
  return zipcodes.some(zipcode => {
    return zipcode.county === selectCounty && zipcode.city === selectCity
  })
}

export const GetZipCodesByCounty = (selectCounty) => {
  return zipcodes.filter(zipcode => zipcode.county === selectCounty)
}

export const GetZipCodesByCity = (selectCity) => {
  return zipcodes.filter(zipcode => zipcode.city.includes(selectCity))
}

export const GetMatchInfo = (text) => {
  let matchInfo = []
  for (const word of ReplaceText(text)) {
    matchInfo = matchInfo.concat(zipcodes.filter(zipcode => zipcode.city.includes(word)))
  }
  const result = []
  const uniqueCounty = [
    ...new Set(matchInfo.map((element) => element.county))
  ]
  uniqueCounty.forEach(county => {
    const cities = []
    matchInfo.forEach(item => {
      if (county === item.county) {
        cities.push(item.city)
      }
    })
    result.push({
      county: county,
      cities: cities
    })
  })
  return result
}
