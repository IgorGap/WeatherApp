import axios from 'axios'
import { useEffect, useState } from 'react'

export const useGetCurrentWeather = (apiKey) => {
  const [currentPlaceWeather, setCurrentPlaceWeather] = useState(null)

  useEffect(() => {
    const getWeatherOnLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            )
            const data = response.data
            if (
              data?.weather?.length &&
              data?.weather[0]?.icon &&
              data?.weather[0]?.description &&
              data?.main?.temp
            )
              setCurrentPlaceWeather(data)
          })
        }
      } catch (error) {
        alert(
          error?.response?.data?.message ? error.response.data.message : error
        )
      }
    }
    getWeatherOnLocation()
    const intervalId = setInterval(getWeatherOnLocation, 100000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { currentPlaceWeather }
}
