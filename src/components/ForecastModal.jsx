import { Close, InfoOutlined } from '@mui/icons-material'
import {
  Stack,
  Dialog,
  Tooltip,
  Typography,
  DialogContent,
} from '@mui/material'

import { Picture } from './Picture'
import { getSeconds } from '../utils/utils'

export const ForecastModal = ({ isOpen, onClose, city, weatherForecast }) => {
  const today = weatherForecast.daily[0]
  const tomorrow = weatherForecast.daily[1]

  const dateFormat = new Date(today.dt * 1000).getDate()
  const dateFormatM = new Date(today.dt * 1000).getMonth()

  const tempCelsiusToday = Math.round(today.temp.day - 273.15)
  const tempCelsiusTomorrow = Math.round(tomorrow.temp.day - 273.15)

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between" marginBottom={5}>
          <Typography marginLeft="40%" variant="h5">
            {city.name}
          </Typography>
          <Close onClick={onClose} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography>
              Сегодня({dateFormat}.{dateFormatM + 1}){' '}
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              {today.temp && <Stack>+{tempCelsiusToday}°С</Stack>}
              {today.weather[0].icon && (
                <>
                  <Stack width={50} height={50}>
                    <img
                      src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </Stack>
                  <Tooltip
                    title={today.weather[0].description}
                    fontSize="small"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </>
              )}
              <Stack>
                <Picture
                  color="#ffeb3b"
                  size={100}
                  sunrise={getSeconds(today.sunrise)}
                  sunset={getSeconds(today.sunset)}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <Typography>
              Завтра ({dateFormat + 1}.{dateFormatM + 1})
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              {tomorrow.temp && <Stack>+{tempCelsiusTomorrow}°С</Stack>}
              {tomorrow.weather[0].icon && (
                <>
                  <Stack width={50} height={50}>
                    <img
                      src={`https://openweathermap.org/img/wn/${tomorrow.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </Stack>
                  <Tooltip
                    title={tomorrow.weather[0].description}
                    fontSize="small"
                  >
                    <InfoOutlined />
                  </Tooltip>
                </>
              )}
              <Stack>
                <Picture
                  color="#fb8c00"
                  size={100}
                  sunrise={getSeconds(today.sunrise)}
                  sunset={getSeconds(today.sunset)}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
