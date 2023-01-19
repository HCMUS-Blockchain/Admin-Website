import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Divider,
  Box,
  Typography,
  DialogActions,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useCampaign } from '@/hooks'
export interface FormDialogInterface {
  setOpen: any
  open: boolean
  data: any
}
function handleData(data: any) {
  const arr = []
  for (const key of Object.keys(data)) {
    if (key === 'game1' && data.game1.length > 0) {
      arr.push({
        name: 'Shake',
        point: data.game1,
      })
    } else if (key === 'game2' && data.game2.length > 0) {
      arr.push({
        name: '2048',
        point: data.game2,
      })
    } else if (key === 'game3' && data.game3.length > 0) {
      arr.push({
        name: 'Fly',
        point: data.game3,
      })
    } else if (key === 'game4' && data.game4.length > 0) {
      arr.push({
        name: 'Quiz',
        point: data.game4,
      })
    }
  }
  return arr
}
export function FormDialog({ data, open, setOpen }: any) {
  const [games, setGames] = useState([])
  const { updateCampaign } = useCampaign()
  useEffect(() => {
    if (data) {
      const games: any = handleData(data.gameID.pointAverage)
      setGames(games)
      console.log(games)
    }
  }, [data])

  const handleAccept = async (id: string) => {
    try {
      setOpen(false)
      const formData = new FormData()
      formData.append('id', id)
      await updateCampaign(formData)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Box textAlign="center">
      {data && (
        <Dialog open={open} fullWidth maxWidth="lg">
          <DialogTitle>#ID: {data._id.toString().toUpperCase()}</DialogTitle>
          <DialogContent>
            <Box textAlign="center">
              <Image src={data.image} alt="image" width="300" height="200" />
            </Box>

            <Paper sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}>
              <Stack spacing={2}>
                <Typography fontWeight="bold" fontSize="lg">
                  CAMPAIGN INFORMATION
                </Typography>
                <Typography>Name: {data.name}</Typography>
                <Typography>Description: {data.description}</Typography>
                <Typography>Total vouchers: {data.numberOfVoucher}</Typography>
                <Typography>Start Date: {dayjs(data.dateBegin).toString()}</Typography>
                <Typography>
                  End Date: {dayjs(data.dateEnd).format('DD/MM/YYYY HH:MM:ss')}
                </Typography>
                <Typography>Random method: {data.typeOfRandom}</Typography>
              </Stack>
              <Stack>
                <Stack spacing={2}>
                  <Typography fontWeight="bold" fontSize="lg">
                    COUNTERPART INFORMATION
                  </Typography>{' '}
                  <Typography>Shop: {data.counterpartID.nameOfShop}</Typography>
                  <Typography>Phone: {data.counterpartID.phone}</Typography>
                  <Typography>Headquarter: {data.counterpartID.headquarter}</Typography>
                </Stack>
              </Stack>
              <Stack>
                <Stack spacing={2}>
                  <Typography fontWeight="bold" fontSize="lg">
                    GAME CONFIGURATION
                  </Typography>
                  <Box>
                    <Typography>Games: </Typography>
                    <Stack direction="row" spacing={1}>
                      {data.games.map((item: any) => (
                        <Chip label={item} color="primary" variant="outlined" key={item} />
                      ))}
                    </Stack>
                  </Box>
                  <Typography>Configuration: </Typography>
                  {games.length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          {games.map((item: any) => (
                            <TableCell align="center" colSpan={2} key={item.name}>
                              {item.name}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          {games.map((item: any) => (
                            <React.Fragment key={item.name}>
                              <TableCell align="center">Discount</TableCell>
                              <TableCell align="center">Point</TableCell>
                            </React.Fragment>
                          ))}
                        </TableRow>
                        <TableRow>
                          {games.map((item: any, index) => (
                            <React.Fragment key={item.name}>
                              <TableCell align="center">{item.point[index].discount}</TableCell>
                              <TableCell align="center">{item.point[index].point}</TableCell>
                            </React.Fragment>
                          ))}
                        </TableRow>
                      </TableHead>
                    </Table>
                  ) : null}
                </Stack>
              </Stack>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => handleAccept(data._id.toString())}>Accept</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}
