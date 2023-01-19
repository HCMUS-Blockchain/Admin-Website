import { Color } from '@/constants'
import {
  Campaign,
  EnhancedTableHeadProps,
  EnhancedTableProps,
  EnhancedTableToolbarProps,
  Order,
} from '@/models/campaign'
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
import { FormDialog } from './form-dialog'

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props
  const createSortHandler = (property: keyof Campaign) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, setSelected } = props
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.info.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Campaigns
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleClickOpen()}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
    </Toolbar>
  )
}

export function EnhancedTable(props: EnhancedTableProps) {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Campaign>('_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [single, setSingle] = React.useState<string>('')
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { headCells, campaignList } = props
  const [dataDialog, setDataDialog] = React.useState()

  const handleDialog = (id: string) => {
    const data = campaignList.find((item: any) => item._id === id)
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
  // const handleDelete = async () => {
  //   if (single.length > 0) await deleteSingleCampaigns(single)
  //   setOpen(false)
  // }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Campaign) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = campaignList.map((n: any) => n._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []
    if (selectedIndex === -1) {
      newSelected = [...selected, id]
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1)
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1)
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)]
    }
    setSelected(newSelected)
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - campaignList.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
        />
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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={campaignList.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(campaignList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const isItemSelected = isSelected(row._id.toString())
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      color="info"
                      // onClick={(event) => handleClick(event, row._id.toString())}
                      // role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row._id.toString())}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        <Link href={`/campaigns/${row._id}`}>{row._id.toString().slice(-5)}</Link>
                      </TableCell>
                      <TableCell align="left">
                        <Image src={row.image.toString()} width={70} height={50} alt="image" />
                      </TableCell>

                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.counterpartID.nameOfShop}</TableCell>
                      <TableCell align="left">
                        {dayjs(row.dateBegin).format('DD/MM/YYYY hh:mmA')}
                      </TableCell>
                      <TableCell align="left">
                        {dayjs(row.dateEnd).format('DD/MM/YYYY hh:mmA')}
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          sx={{
                            backgroundColor: Color[`${row.status}`],
                            p: 0.5,
                            borderRadius: 2,
                            textAlign: 'center',
                            color: 'white',
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.numberOfVoucher}</TableCell>
                      <TableCell align="left">
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
          count={campaignList.length}
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
      <FormDialog data={dataDialog} setOpen={setOpen} open={open} />
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  )
}
