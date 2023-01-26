import { statisticApi } from '@/api-client'
import { LineChart, LineChartOne } from '@/components/dashboard'
import { DateTimePickerField } from '@/components/form'
import { useCampaign, useStatisticUser, useStatisticVoucher } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import StarIcon from '@mui/icons-material/Star'

import * as yup from 'yup'

export interface DashboardComponentInterface {
  id: string
}
export function DashboardComponent({ id }: DashboardComponentInterface) {
  const [campaignList, setCampaignList] = useState([])
  const [usedVoucher, setUsedVoucher] = useState([])
  const [releaseVoucher, setReleaseVoucher] = useState([])
  const [dateOfTheYear, setDateOfTheYear] = useState<any>([])
  const [startDate, setStartDate] = useState(dayjs().subtract(9, 'day'))
  const [endDate, setEndDate] = useState(dayjs())
  const [user, setUser] = useState([])
  const { data: vouchers, getVoucherStatistic } = useStatisticVoucher()
  const { data: campaignData } = useCampaign()
  const { data: users, getUserStatistic } = useStatisticUser()
  const schema = yup.object().shape({
    option: yup.string().required('Please choose name of campaign'),
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
      option: '',
      startDate: startDate,
      endDate: endDate,
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (campaignData) {
      const tempCampaignList = campaignData.data.campaigns.map((item: any) => ({
        _id: item._id,
        name: item.name,
      }))
      setCampaignList(tempCampaignList)
    }
  }, [campaignData])

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
    if (vouchers) {
      setUsedVoucher(vouchers.data.result[0])
      setReleaseVoucher(vouchers.data.result[1])
    }
  }, [vouchers])

  useEffect(() => {
    if (users) {
      setUser(users.data.result)
    }
  }, [users])

  const handleChangeSubmit = async (values: any) => {
    try {
      if (id === 'Voucher') {
        await getVoucherStatistic(values)
        setStartDate(dayjs(values.startDate))
        setEndDate(dayjs(values.endDate))
      } else {
        await getUserStatistic(values)
      }
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
            {id === 'Voucher' ? 'Voucher Statistic' : 'User Statistic'}
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
                errors.option ? 'Please choose a campaign' : 'Please select your campaign'
              }
            >
              {campaignList.map((option: any) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <DateTimePickerField name="startDate" control={control} label="Start Date" />
            <DateTimePickerField name="endDate" control={control} label="End Date" />
            <Button type="submit">Show</Button>
          </Stack>
        </LocalizationProvider>
      </Box>

      {id === 'Voucher' ? (
        <LineChart
          dayOfTheYear={dateOfTheYear}
          usedVoucher={usedVoucher}
          releaseVoucher={releaseVoucher}
        />
      ) : (
        <LineChartOne dayOfTheYear={dateOfTheYear} user={user} />
      )}
    </Paper>
  )
}
