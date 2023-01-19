import { Color } from '@/constants'
import { EnhancedTableHeadUserProps, EnhancedTableUserProps, User } from '@/models'
import {
  Campaign,
  EnhancedTableHeadProps,
  EnhancedTableProps,
  EnhancedTableToolbarProps,
  Order,
} from '@/models/campaign'
import defaultImage from '@/images/default_image.png'
import { getComparator, stableSort } from '@/utils/campaigns'
import FilterListIcon from '@mui/icons-material/FilterList'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  alpha,
  Box,
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
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

function EnhancedTableHead(props: EnhancedTableHeadUserProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props
  const createSortHandler = (property: keyof User) => (event: React.MouseEvent<unknown>) => {
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

export function EnhancedTableUser(props: EnhancedTableUserProps) {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof User>('_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [single, setSingle] = React.useState<string>('')
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { headCells, userList } = props
  const [dataDialog, setDataDialog] = React.useState()
  const handleDialog = (id: string) => {
    const data = userList.find((item: any) => item._id === id)
    setDataDialog(data)
    setOpen(true)
  }
  const handleClickOpen = (id: string) => {
    setSingle(id)
    setOpen(true)
  }

  const handleClose = () => {
    setSingle('')
    setOpen(false)
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0

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
              rowCount={userList.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(userList, getComparator(order, orderBy))
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
                        {row.avatar ? (
                          <Image
                            src={row.avatar.toString() || ''}
                            width={50}
                            height={50}
                            alt="image"
                            style={{ borderRadius: '50%' }}
                          />
                        ) : (
                          <Image
                            src={defaultImage}
                            width={50}
                            height={50}
                            alt="image"
                            style={{ borderRadius: '50%' }}
                          />
                        )}
                      </TableCell>

                      <TableCell align="center">{row.fullName}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Details">
                          <IconButton
                            onClick={() => handleDialog(row._id.toString())}
                            color="warning"
                          >
                            <VisibilityIcon sx={{ p: 0 }} />
                          </IconButton>
                        </Tooltip>
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
          count={userList.length}
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
    </Box>
  )
}
