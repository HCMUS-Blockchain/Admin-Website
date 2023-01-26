import { LineChartOne } from '@/components/dashboard'
import { DateTimePickerField } from '@/components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import StarIcon from '@mui/icons-material/Star'
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useStatisticCampaign } from '@/hooks/useStatisticCampaign'
import * as yup from 'yup'

export function CampaignComponent() {
  const [dateOfTheYear, setDateOfTheYear] = useState<any>([])
  const [startDate, setStartDate] = useState(dayjs().subtract(9, 'day'))
  const [endDate, setEndDate] = useState(dayjs())
  const [user, setUser] = useState<number[]>([])
  const optionList = ['Pending', 'Happening', 'Ended', 'All']
  const typeList = ['Chainlink', 'Uniswap', 'All']
  const { data: campaigns, getStatisticCampaign } = useStatisticCampaign()
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
          yup.max(dayjs(startDate).add(9, 'day'), 'The number of days can not exceed 10 days')
      ),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: 'All',
      typeOfRandom: 'All',
      startDate: startDate,
      endDate: endDate,
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (campaigns) {
      setUser(campaigns.data.result)
    }
  }, [campaigns])

  useEffect(() => {
    const daysOfYear: any = []
    let temp = startDate

    while (temp.isBefore(endDate.add(1, 'day'))) {
      daysOfYear.push(temp.format('DD/MM/YYYY'))
      temp = temp.add(1, 'day')
    }
    setDateOfTheYear(daysOfYear)
  }, [startDate, endDate])

  const handleChangeSubmit = async (values: any) => {
    try {
      await getStatisticCampaign(values)
      setStartDate(dayjs(values.startDate))
      setEndDate(dayjs(values.endDate))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignContent: 'center' }}>
        <Box
          sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}
          alignSelf="center"
        >
          <IconButton disabled>
            <StarIcon />
          </IconButton>
          <Typography variant="h6" alignSelf="center">
            Campaign Statistic
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
              {...register('status')}
              error={!!errors.status}
              helperText={errors.status ? 'Please choose status' : 'Please select status '}
            >
              {optionList.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-campaign"
              select
              label="Select"
              defaultValue=""
              {...register('typeOfRandom')}
              error={!!errors.typeOfRandom}
              helperText={
                errors.typeOfRandom ? 'Please choose random type' : 'Please select random type '
              }
            >
              {typeList.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <DateTimePickerField name="startDate" control={control} label="Start Date" />
            <DateTimePickerField name="endDate" control={control} label="End Date" />
            <Button type="submit">Show</Button>
          </Stack>
        </LocalizationProvider>
      </Box>

      <LineChartOne dayOfTheYear={dateOfTheYear} user={user} />
    </Paper>
  )
}
