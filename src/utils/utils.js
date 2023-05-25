import axios from 'axios'

export const getCityWeather = (city, apiKey, setCities) => {
  const { name, code } = city

  const api = code
    ? `https://api.openweathermap.org/data/2.5/weather?q=${name},${code}&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`

  axios
    .get(api)
    .then((response) => {
      if (response.data?.coord) {
        const data = response.data
        if (
          data?.weather?.length &&
          data?.weather[0]?.icon &&
          data?.weather[0]?.description &&
          data?.main?.temp
        ) {
          setCities((prev) =>
            prev.map((cityObj) =>
              cityObj.name === city.name && city.code === cityObj.code
                ? { ...cityObj, currentWeather: response.data, coord: data.coord }
                : cityObj
            )
          )
        } else {
          alert('Uncorrect api response')
        }
      }
    })
    .catch((error) => {
      const err = error?.response?.data?.message || error
      alert(`${city.name}: ${err}`)
    })
}

export const getWeatherForecast = async (
  city,
  apiKey,
  setCities,
  setWeatherForecast
) => {
  const { lat, lon } = city.coord
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`
    )
    const data = response.data
    if (
      data?.current?.weather?.length &&
      data?.current.weather[0]?.icon &&
      data?.current.weather[0]?.description &&
      data?.current?.temp
    ) {
      setWeatherForecast(data)
    }
  } catch (error) {
    const err = error?.response?.data?.message || error
    alert(err)
  }
}

export const getSeconds = (time) => {
const date = new Date(time * 1000)
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
return hours * 3600 + minutes * 60 + seconds
}
