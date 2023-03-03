import { MainLayout } from '@/components/layout'
import {
  Stack,
  Paper,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Breadcrumbs,
} from '@mui/material'
import ArrowDownWardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import StarIcon from '@mui/icons-material/Star'
import { Box } from '@mui/system'
import { statisticApi } from '@/api-client'
import React, { useState, useEffect } from 'react'
import { filter, generalManagement } from '@/constants'
import {
  CampaignComponent,
  DashboardComponent,
  DoughnutChart,
  Item,
  TypoItem,
  VerticalBarChart,
} from '@/components/dashboard'

export function Home() {
  const [option, setOption] = useState('day')
  const [data, setData] = useState(generalManagement)

  const handleChange = async (e: any) => {
    const result = await statisticApi.getGeneralStatistics(e.target.value)
    if (e.target.value === 'today') {
      setOption('day')
    } else {
      setOption(e.target.value)
    }
    setData(result.data.result)
  }

  useEffect(() => {
    async function fetch() {
      const result = await statisticApi.getGeneralStatistics('today')
      setData(result.data.result)
    }
    fetch()
  }, [])
  console.log(data)
  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" variant="h6">
          Dashboard
        </Typography>
      </Breadcrumbs>
      <Paper>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignContent: 'center' }}
        >
          <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
            <IconButton disabled>
              <StarIcon />
            </IconButton>
            <Typography variant="h6" alignSelf="center">
              Statistic General
            </Typography>
          </Box>

          <TextField
            id="outlined-select-currency"
            select
            defaultValue="today"
            sx={{
              width: '200px',
            }}
            onChange={handleChange}
            color="secondary"
          >
            {filter.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                color="secondary"
                sx={{ color: '#00ABCC' }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Grid container spacing={2}>
          {data[0].value !== null
            ? data.map((item: any) => (
                <Grid item xs={3} key={item.label}>
                  <Paper sx={{ p: 2, m: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.label}</Typography>
                      <Tooltip title={item.description}>
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h4" fontWeight="bold">
                        {item.value}
                      </Typography>
                      <Box
                        width="100px"
                        sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                        alignSelf="center"
                      >
                        <Item item={item} />
                      </Box>
                    </Box>
                    <TypoItem item={item} option={option} />
                  </Paper>
                </Grid>
              ))
            : generalManagement.map((item: any) => (
                <Grid item xs={3} key={item.label}>
                  <Paper sx={{ p: 2, m: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.label}</Typography>
                      <Tooltip title={item.description}>
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h4" fontWeight="bold" color="rgb(128,128,128)">
                        0
                      </Typography>
                      <Box
                        width="100px"
                        sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                        alignSelf="center"
                      >
                        <Box bgcolor="rgb(128,128,128,0.2)" width="50px">
                          <Typography fontWeight="bold" textAlign="center" color="rgb(128,128,128)">
                            0%
                          </Typography>
                        </Box>
                        <ArrowUpwardIcon sx={{ color: 'rgb(128,128,128)' }} />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
        </Grid>
      </Paper>
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Box
                sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}
                alignSelf="center"
              >
                <IconButton disabled>
                  <StarIcon />
                </IconButton>
                <Typography variant="h6" alignSelf="center">
                  Game Statistic
                </Typography>
              </Box>
            </Stack>

            <DoughnutChart />
          </Box>
          <Box>
            <VerticalBarChart />
          </Box>
        </Box>
      </Paper>
      <DashboardComponent id="Voucher" />
      <DashboardComponent id="User" />
      <Box>
        <CampaignComponent />
      </Box>
    </Stack>
  )
}
Home.Layout = MainLayout
export default Home
