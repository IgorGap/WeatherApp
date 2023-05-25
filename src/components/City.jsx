import { Delete, InfoOutlined } from '@mui/icons-material'
import { Stack, Tooltip, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'

export const City = ({ name, temp, onDelete, onClick, icon, description }) => {
  const tempCelsius = Math.round(temp - 273.15)

  return (
    <Stack
      gap={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      m={2}
    >
      <Stack
        onClick={onClick}
        padding={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width={400}
        height={40}
        sx={{
          backgroundColor: teal[100],
          border: `1px solid ${teal[600]}`,
          borderRadius: '8px',
        }}
      >
        {name !== 'Текущее местоположение' ? (
          <Stack gap={0.5} direction="row" alignItems="center" width={100}>
            <Typography sx={{ cursor: 'pointer' }}>{name}</Typography>
            {
              <Tooltip title="Кликните на название города, чтобы узнать погоду на сегодня и на завтра">
                <InfoOutlined fontSize="small" />
              </Tooltip>
            }
          </Stack>
        ) : (
          <Stack gap={0.5} direction="row" alignItems="center" width={100}>
            <Typography>{name}</Typography>
          </Stack>
        )}
        <Stack direction="row" gap={1} alignItems="center">
          {temp && <Stack>{tempCelsius}</Stack>}
          {icon && (
            <>
              <Stack width={50} height={50}>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt=""
                />
              </Stack>
              <Tooltip title={description} fontSize="small">
                <InfoOutlined />
              </Tooltip>
            </>
          )}
        </Stack>
      </Stack>
      {name !== 'Текущее местоположение' && (
        <Delete
          onClick={onDelete}
          color="text.secondary"
          sx={{ cursor: 'pointer' }}
        />
      )}
    </Stack>
  )
}
