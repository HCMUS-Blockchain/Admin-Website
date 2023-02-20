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
  TableBody,
  TextField,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useCampaign } from '@/hooks'
export interface FormDialogInterface {
  setOpen: any
  open: boolean
  data: any
}

export function FormDialog({ data, open, setOpen }: any) {
  const { updateCampaign, refuseCampaign } = useCampaign()
  const [openDialog, setOpenDialog] = useState(false)
  const textFieldRef = useRef<any>(null)
  const handleAccept = async (id: string) => {
    try {
      setOpen(false)
      const formData = new FormData()
      formData.append('id', id)
      await updateCampaign(formData, data)
    } catch (e) {
      console.log(e)
    }
  }
  const handleRefuse = async (id: string) => {
    try {
      setOpenDialog(true)
    } catch (e) {
      console.log(e)
    }
  }

  const handleCancel = () => {
    setOpenDialog(false)
  }

  const handleSubmit = async (id: string) => {
    try {
      setOpenDialog(false)
      setOpen(false)
      const formData = new FormData()
      formData.append('id', id)
      if (textFieldRef.current) {
        formData.append('message', textFieldRef.current.value)
      }
      await refuseCampaign(formData)
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
              <Stack spacing={2} width="350px">
                <Typography fontWeight="bold" variant="h6">
                  CAMPAIGN INFORMATION
                </Typography>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    Name:
                  </Typography>{' '}
                  {data.name}
                </Typography>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    Description:
                  </Typography>{' '}
                  {data.description}
                </Typography>
                <Typography>
                  {' '}
                  <Typography fontWeight="bold" component="span">
                    Initial Vouchers:
                  </Typography>{' '}
                  {data.numberOfVoucher}
                </Typography>
                <Typography>
                  {' '}
                  <Typography fontWeight="bold" component="span">
                    Remaining Vouchers:
                  </Typography>{' '}
                  {data.remainingVoucher}
                </Typography>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    Start Date:
                  </Typography>{' '}
                  {dayjs(data.dateBegin).format('DD/MM/YYYY HH:MM:ss')}
                </Typography>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    End Date:
                  </Typography>{' '}
                  {dayjs(data.dateEnd).format('DD/MM/YYYY HH:MM:ss')}
                </Typography>
                <Typography>
                  {' '}
                  <Typography fontWeight="bold" component="span">
                    Random Method:
                  </Typography>{' '}
                  {data.typeOfRandom}
                </Typography>
              </Stack>
              <Stack>
                <Stack spacing={2}>
                  <Typography fontWeight="bold" variant="h6">
                    COUNTERPART INFORMATION
                  </Typography>{' '}
                  <Typography>
                    {' '}
                    <Typography fontWeight="bold" component="span">
                      Shop:{' '}
                    </Typography>{' '}
                    {data.counterpartID.nameOfShop}
                  </Typography>
                  <Typography>
                    {' '}
                    <Typography fontWeight="bold" component="span">
                      Phone{' '}
                    </Typography>{' '}
                    {data.counterpartID.phone}
                  </Typography>
                  <Typography>
                    {' '}
                    <Typography fontWeight="bold" component="span">
                      Headquarter:
                    </Typography>{' '}
                    {data.counterpartID.headquarter}
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <Stack spacing={2}>
                  <Typography fontWeight="bold" variant="h6">
                    DISCOUNT VOUCHER CONFIGURATION
                  </Typography>
                  <Box>
                    <Typography>
                      {' '}
                      <Typography fontWeight="bold" component="span">
                        Games:
                      </Typography>{' '}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {data.games.map((item: any) => (
                        <Chip label={item} color="primary" variant="outlined" key={item} />
                      ))}
                    </Stack>
                  </Box>
                  <Typography>
                    {' '}
                    <Typography fontWeight="bold" component="span">
                      The number of each voucher:
                    </Typography>{' '}
                  </Typography>
                  {data.vouchers.length > 0 ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          {['Discount', 'Amount'].map((item: any) => (
                            <TableCell align="center" colSpan={2} key={item}>
                              {item}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.vouchers.map((item: any) => (
                          <TableRow key={item.discount}>
                            <TableCell align="center" colSpan={2}>
                              {item.discount}%
                            </TableCell>
                            <TableCell align="center" colSpan={2}>
                              {item.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : null}
                </Stack>
              </Stack>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {data.status === 'PENDING' ? (
              <>
                <Button onClick={() => handleRefuse(data._id.toString())}>Refuse</Button>
                <Button onClick={() => handleAccept(data._id.toString())}>Accept</Button>
              </>
            ) : (
              <>
                <Button disabled>Refuse</Button>
                <Button disabled>Accept</Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
      <Dialog open={openDialog} fullWidth maxWidth="sm">
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <TextField multiline rows="4" fullWidth inputRef={textFieldRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button onClick={() => handleSubmit(data._id.toString())}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
