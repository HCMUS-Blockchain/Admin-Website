import { usePuzzle, usePuzzleStatistic } from '@/hooks'
import StarIcon from '@mui/icons-material/Star'
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useForm } from 'react-hook-form'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'The number of vouchers is got',
    },
  },
}
export function VerticalBarChart() {
  const { data: puzzles } = usePuzzle()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      option: '',
    },
  })
  const [data, setData] = useState({
    labels: [
      'Piece1',
      'Piece2',
      'Piece3',
      'Piece4',
      'Piece5',
      'Piece6',
      'Piece7',
      'Piece8',
      'Piece9',
    ],
    datasets: [
      {
        label: 'Pieces',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })

  const handleChangeSubmit = async (values: any) => {
    try {
      const x = await axios.post('/api/admin/statistics/puzzle', { id: values.option })
      setData({
        ...data,
        datasets: [
          {
            label: 'Pieces',
            data: x.data.result,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignContent: 'center' }}>
        <Box
          sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}
          alignSelf="center"
        >
          <IconButton disabled>
            <StarIcon />
          </IconButton>
          <Typography variant="h6" alignSelf="center">
            Puzzles Statistic
          </Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            direction="row"
            spacing={2}
            pt={2}
            component="form"
            onSubmit={handleSubmit(handleChangeSubmit)}
          >
            <TextField
              id="outlined-select-campaign"
              select
              label="Select"
              defaultValue=""
              {...register('option')}
              error={!!errors.option}
              helperText={
                errors.option
                  ? "Please choose a puzzle's campaign"
                  : "Please choose a puzzle's campaign"
              }
            >
              {puzzles
                ? puzzles.data.puzzles.map((option: any) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.title}
                    </MenuItem>
                  ))
                : null}
            </TextField>
            <Button type="submit">Show</Button>
          </Stack>
        </LocalizationProvider>
      </Box>
      <Bar options={options} data={data} height="250" width="350" />
    </>
  )
}
