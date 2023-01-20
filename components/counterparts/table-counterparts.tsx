import { useUser } from '@/hooks/useUser'
import defaultImage from '@/images/default_image.png'
import { EnhancedTableHeadUserProps, EnhancedTableUserProps, User } from '@/models'
import { Order } from '@/models/campaign'
import { Counterpart, EnhancedTableHeadCounterpartProps } from '@/models/counterpart'
import { getComparator, stableSort } from '@/utils/campaigns'
import BlockIcon from '@mui/icons-material/Block'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TableSortLabel,
  Tooltip,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { counterpartCell } from '@/constants'
import Image from 'next/image'
import * as React from 'react'
import { useCounterpart } from '@/hooks'

function EnhancedTableHead(props: EnhancedTableHeadCounterpartProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props
  const createSortHandler = (property: keyof Counterpart) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id && headCell.id !== 'action'}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              disabled={headCell.id === 'action'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export function EnhancedTableCounterpart() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Counterpart>('_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [counterparts, setCounterparts] = React.useState([])
  const [temp, setTemp] = React.useState({
    id: '',
    isBlock: false,
  })

  const { data, updateCounterpart } = useCounterpart()
  React.useEffect(() => {
    if (data) {
      setCounterparts(data.data.counterparts)
    }
  }, [data])
  const handleDialog = async (id: string, isBlock: boolean) => {
    setTemp({
      id,
      isBlock,
    })
    setOpen(true)
  }

  const handleAgree = async () => {
    const formData = new FormData()
    formData.append('id', temp.id)
    formData.append('isBlock', temp.isBlock.toString())
    setOpen(false)
    await updateCounterpart(formData)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Counterpart) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - counterparts.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={counterparts.length}
              headCells={counterpartCell}
            />
            <TableBody>
              {stableSort(counterparts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const isItemSelected = isSelected(row._id.toString())
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      color="info"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row._id.toString().slice(-5)}
                      </TableCell>
                      <TableCell align="center">
                        {row.image ? (
                          <Image
                            src={row.image.toString() || ''}
                            width={40}
                            height={40}
                            alt="image"
                            style={{ borderRadius: '50%' }}
                          />
                        ) : (
                          <Image
                            src={defaultImage}
                            width={40}
                            height={40}
                            alt="image"
                            style={{ borderRadius: '50%' }}
                          />
                        )}
                      </TableCell>

                      <TableCell align="center">{row.nameOfShop}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.headquarter}</TableCell>
                      <TableCell align="center">
                        {row.isBlock ? (
                          <Tooltip title="Unblock">
                            <IconButton
                              onClick={() => handleDialog(row._id.toString(), false)}
                              color="warning"
                            >
                              <BlockIcon sx={{ p: 0, color: 'gray' }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Block">
                            <IconButton
                              onClick={() => handleDialog(row._id.toString(), true)}
                              color="warning"
                            >
                              <BlockIcon sx={{ p: 0, color: 'red' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={counterparts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} color="primary" />}
        label="Dense padding"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {temp.isBlock.toString() === 'true' ? (
          <>
            <DialogTitle id="alert-dialog-title">Block counterpart</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to block this counterpart ?
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">Unblock counterpart</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to unblock this counterpart ?
              </DialogContentText>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
