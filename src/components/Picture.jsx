import { Box } from '@mui/material'
import React from 'react'

export const Picture = ({ sunrise, sunset, color, size }) => {

  const radius = size / 2
  const path = `M 0 ${radius} A ${radius} ${radius} 0 0 1 ${size} ${radius} L ${size} ${size} L 0 ${size} Z`
  const length = 24 * 60 * 60

  const getCoords = (type) => {
    const proc = type / length
    const corner = (proc * 180) / 100


    const pathX =
      size/2 + ((size / 2) * Math.cos(corner) > 0
        ? (size / 2) * Math.cos(corner)
        : size / 2 - (size / 2) * Math.cos(corner))
    const pathY = (size / 2) * Math.sin(corner)


    return { pathX, pathY }
  }

  const sunsetXY = getCoords(sunset)
  const sunriseXY = getCoords(sunrise)

  return (
    <Box>
      {/* <Box
        sx={{
          position: 'relative',
          right: `${sunsetXY.pathX}px`,
          top: `${sunsetXY.pathY}px`,
          color: 'yellow'
        }}
      >
        з
      </Box> */}
      {/* <Box
        sx={{
          position: 'relative',
          left: `${sunriseXY.pathX}px`,
          bottom: `${sunriseXY.pathY}px`,
          color: 'yellow',
        }}
      >
        d
      </Box> */}
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        <path d={path} fill={color} />
      </svg>
    </Box>
  )
}
