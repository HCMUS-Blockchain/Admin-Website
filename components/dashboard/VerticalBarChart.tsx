import { DateTimePickerField } from '@/components/form'
import { useStatisticCounterpart } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import StarIcon from '@mui/icons-material/Star'
import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
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
import { Bar } from 'react-chartjs-2'
import { useForm } from 'react-hook-form'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import * as yup from 'yup'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'A number of new counterparts',
    },
  },
}
export function VerticalBarChart() {
  const [dateOfTheYear, setDateOfTheYear] = useState<any>([])
  const [startDate, setStartDate] = useState(dayjs().subtract(5, 'day'))
  const [endDate, setEndDate] = useState(dayjs())
  const { data: counterparts, getCounterpartStatistic } = useStatisticCounterpart()
  const schema = yup.object().shape({
    startDate: yup.date().required('Please enter a begin date'),
    endDate: yup
      .date()
      .required('Please enter a end date')
      .when(
        'startDate',
        (startDate, yup) =>
          startDate &&
          yup.min(dayjs(startDate), 'End time cannot be before start time') &&
          yup.max(dayjs(startDate).add(5, 'day'), 'The number of days can not exceed 6 days')
      ),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: startDate,
      endDate: endDate,
    },
    resolver: yupResolver(schema),
  })

  const [data, setData] = useState({
    labels: dateOfTheYear,
    datasets: [
      {
        label: 'A number of new counterparts',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })
  useEffect(() => {
    if (counterparts) {
      const temp = {
        labels: dateOfTheYear,
        datasets: [
          {
            label: 'New counterparts',
            data: counterparts.data.result,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }
      setData(temp)
    }
  }, [counterparts, dateOfTheYear])

  useEffect(() => {
    const daysOfYear: any = []
    let temp = startDate

    while (temp.isBefore(endDate.add(1, 'day'))) {
      daysOfYear.push(temp.format('DD/MM/YYYY'))
      temp = temp.add(1, 'day')
    }
    setDateOfTheYear(daysOfYear)
  }, [startDate, endDate])

  useEffect(() => {
    const x = async () => {
      await getCounterpartStatistic({ startDate, endDate })
    }
    x()
  }, [])

  const handleChangeSubmit = async (values: any) => {
    try {
      await getCounterpartStatistic(values)
      setStartDate(dayjs(values.startDate))
      setEndDate(dayjs(values.endDate))
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
            Counterpart Statistic
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
            <DateTimePickerField name="startDate" control={control} label="Start Date" />
            <DateTimePickerField name="endDate" control={control} label="End Date" />
            <Box alignSelf="center">
              <Button variant="outlined" type="submit">
                Show
              </Button>
            </Box>
          </Stack>
        </LocalizationProvider>
      </Box>
      <Bar options={options} data={data} height="250" width="350" />
    </>
  )
}
