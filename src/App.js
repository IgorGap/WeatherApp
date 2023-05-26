import { useEffect, useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'

import { City } from './components/City'
import { NewCityModal } from './components/NewCityModal'
import { useGetCurrentWeather } from './hooks/useGetCurrentWeather'
import { getCityWeather, getWeatherForecast } from './utils/utils'
import { ForecastModal } from './components/ForecastModal'

function App() {
  const [cities, setCities] = useState([])
  const [currentPlace, setCurrentPlace] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [isCityModalOpen, setIsCityModalOpen] = useState(false)
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false)
  const [clickedCity, setClickedCity] = useState(null)
  const apiKey = '28f764b8edd41f55715e634ad7b6a37b'

  const { currentPlaceWeather } = useGetCurrentWeather(apiKey)

  useEffect(() => {
    if (
      currentPlaceWeather?.weather?.length &&
      currentPlaceWeather?.main?.temp
    ) {
      setCurrentPlace({
        name: 'Текущее местоположение',
        code: '',
        currentWeather: currentPlaceWeather,
      })
    }
  }, [currentPlaceWeather])

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '50px',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '350px',
          height: '500px',
          padding: '10px',
          borderRadius: '10px',
          border: '2px solid gray',
          backgroundColor: '#b2ebf2',
        }}
      >
        <Typography variant="h4">Прогноз погоды</Typography>
        {currentPlace?.name && (
          <City
            key={currentPlace.name}
            name={currentPlace.name}
            temp={currentPlace.currentWeather.main.temp}
            icon={currentPlace.currentWeather.weather[0].icon}
            description={currentPlace.currentWeather.weather[0].description}
          />
        )}
        <Box sx={{ height: '320px', overflowY: 'scroll' }}>
          {cities.length ? (
            cities.map((city, index) => (
              <City
                key={index}
                name={city.name}
                temp={city?.currentWeather?.main?.temp}
                icon={city?.currentWeather?.weather[0]?.icon}
                description={city?.currentWeather?.weather[0]?.description}
                onDelete={() =>
                  setCities((prev) => prev.filter((c, ind) => ind !== index))
                }
                onClick={() => {
                  city?.currentWeather &&
                    getWeatherForecast(
                      city,
                      apiKey,
                      setCities,
                      setWeatherForecast
                    )
                  setClickedCity(index)
                  setIsForecastModalOpen(true)
                }}
              />
            ))
          ) : (
            <></>
          )}
        </Box>
        <Button
          onClick={() => setIsCityModalOpen(true)}
          startIcon={<AddCircle />}
          sx={{ color: 'black' }}
        >
          Добавить
        </Button>
        <NewCityModal
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          onSubmit={(newCity) => {
            setCities((prev) => [...prev, newCity])
            getCityWeather(newCity, apiKey, setCities)
          }}
        />
      </Box>
      {weatherForecast && (
        <ForecastModal
          city={cities.find((el, ind) => ind === clickedCity)}
          weatherForecast={weatherForecast}
          isOpen={isForecastModalOpen}
          onClose={() => {
            setClickedCity(null)
            setWeatherForecast(null)
          }}
        />
      )}
    </Box>
  )
}

export default App
