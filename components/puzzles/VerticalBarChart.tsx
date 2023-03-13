import { usePuzzle, usePuzzleStatistic } from '@/hooks'
import StarIcon from '@mui/icons-material/Star'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
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
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import React from 'react'
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
      text: 'The number of Puzzles is got',
    },
  },
}
export function VerticalBarChart() {
  const { data: puzzles } = usePuzzle()
  const [winnerList, setWinnerList] = useState([])
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
        label: 'Quantity',
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
            data: x.data.result.data,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })
      if (x.data.result.length === 0) {
        setWinnerList([])
      } else {
        setWinnerList(x.data.result.list)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Box>
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
              placeholder="Select a puzzle campaign"
              sx={{ width: '240px' }}
              {...register('option')}
              error={!!errors.option}
              helperText={errors.option ? "Please choose a puzzle's campaign" : null}
            >
              {puzzles
                ? puzzles.data.puzzles.map((option: any) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.title}
                    </MenuItem>
                  ))
                : null}
            </TextField>
            <Box alignSelf="center">
              <Button variant="outlined" type="submit">
                Show
              </Button>
            </Box>
          </Stack>
        </LocalizationProvider>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Box width="900" height="500">
          <Bar options={options} data={data} width="900" height="500" />
        </Box>
        <Stack sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mr: 2, ml: 2, width: '300px' }} component="span">
            LIST OF WINNER
          </Typography>

          <Box sx={{ mt: 0 }}>
            <List
              sx={{
                bgcolor: 'background.paper',
                maxHeight: '450px',
                overflow: 'auto',
              }}
            >
              {winnerList.length !== 0 ? (
                winnerList.map((item: any, index) => (
                  <ListItem alignItems="flex-start" key={index} sx={{ width: '270px' }}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography sx={{ width: '270px' }}>{item.name}</Typography>}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              display: 'block',
                              overflow: ' hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '210px',
                            }}
                            variant="body2"
                            component="span"
                            color="text.primary"
                          >
                            Email: {item.email}
                          </Typography>
                          <Typography
                            sx={{
                              display: 'block',
                              overflow: ' hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '210px',
                            }}
                            variant="body2"
                            component="span"
                            color="text.primary"
                          >
                            Code: {item.code}
                          </Typography>

                          <Typography
                            sx={{
                              display: 'block',
                              overflow: ' hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '210px',
                            }}
                            variant="body2"
                            component="span"
                            color="text.primary"
                          >
                            Received: {dayjs(item.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Divider variant="inset" component="li" />
                  </ListItem>
                ))
              ) : (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography component="span" color="text.primary">
                        There is not any winner
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
