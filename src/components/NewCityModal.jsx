import { Close, Info } from '@mui/icons-material'
import {
  Box,
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogActions,
  DialogContent,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'

export const NewCityModal = ({ isOpen, onClose, onSubmit }) => {
  const initialCity = { name: '', code: '' }
  const [newCity, setNewCity] = useState(initialCity)

  const onChange = (name, value) => {
    setNewCity((prev) => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    setNewCity(initialCity)
    onClose()
  }

  const isSaveButtonDisabled = !newCity.name.trim()

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between" marginBottom={5}>
          <Typography marginLeft="40%" variant="h5">
            Добавить
          </Typography>
          <Close onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack justifyContent="center" alignItems="center" gap={5}>
          <Stack>
            <Typography>Название</Typography>
            <TextField
              value={newCity.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </Stack>
          <Box>
            <Typography>Код</Typography>
            <TextField
              value={newCity.code}
              onChange={(e) => onChange('code', e.target.value)}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <>
          <Button
            onClick={() => {
              onSubmit(newCity)
              setNewCity(initialCity)
              onClose()
            }}
            sx={{ color: 'black' }}
            disabled={isSaveButtonDisabled}
          >
            Сохранить
          </Button>
          {isSaveButtonDisabled && (
            <Tooltip title="Необходимо ввести название города" placement="top-start" >
              <Info fontSize="small" />
            </Tooltip>
          )}
        </>
      </DialogActions>
    </Dialog>
  )
}
