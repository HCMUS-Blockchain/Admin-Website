import { Color, puzzleCells } from '@/constants'
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
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  MenuItem,
  Table,
  Popover,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Stack,
  FormLabel,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import SearchIcon from '@mui/icons-material/Search'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Search, SearchIconWrapper, StyledInputBase } from '@/utils/campaigns/styles'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import { DateTimePickerField } from '../form'
import CheckboxesGroup from '../form/check-box-field'
import { FormDialog } from './form-dialog'
import { useCampaign, usePuzzle } from '@/hooks'
import { CheckEndDate, CheckQuantity, CheckStartDate } from '@/utils/filter'
import {
  EnhancedTableHeadPuzzleProps,
  EnhancedTablePuzzleProps,
  EnhancedTablePuzzleToolbarProps,
  Puzzle,
} from '@/models/puzzle'

const conditions = [
  'Greater than',
  'Greater than or equal to',
  'Less than',
  'Less than or equal to',
]

const status = ['Created', 'Happening', 'Ended']

function EnhancedTableHead(props: EnhancedTableHeadPuzzleProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    setFirstLoading,
  } = props
  const createSortHandler = (property: keyof Puzzle) => (event: React.MouseEvent<unknown>) => {
    setFirstLoading(false)
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

function EnhancedTableToolbar(props: EnhancedTablePuzzleToolbarProps) {
  const { numSelected, selected, setSelected, setPuzzles } = props
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const openPopover = Boolean(anchorEl)
  const id = openPopover ? 'simple-popover' : undefined
  const methods = useForm()

  const { register, handleSubmit, setValue } = methods
  const { data, searchPuzzle } = usePuzzle()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const handleSearch = async (e: any) => {
    if (e.key === 'Enter') {
      await searchPuzzle({ keyword: e.target.value })
    }
  }

  const handleSubmitFilter = (e: any) => {
    let result = data.data.puzzles
    if (e.status) {
      const temp = e.status.map((item: string) => {
        return item.toUpperCase()
      })
      result = result.filter((item: any) => temp.includes(item.status.toString()))
    }
    if (e.startDate && e.startDateCondition) {
      result = CheckStartDate(e.startDateCondition, result, e.startDate)
    }
    if (e.endDate && e.endDateCondition) {
      result = CheckEndDate(e.startDateCondition, result, e.startDate)
    }
    console.log(e)
    if (e.remainingVoucher && e.remainingVoucherCondition) {
      result = CheckQuantity(e.remainingVoucherCondition, result, e.remainingVoucher)
    }
    setPuzzles(result)
    setAnchorEl(null)
  }

  const handleReset = () => {
    setValue('status', undefined)
    setValue('startDate', undefined)
    setValue('startDateCondition', undefined)
    setValue('endDate', undefined)
    setValue('endDateCondition', undefined)
    setPuzzles(data.data.puzzles)
    setAnchorEl(null)
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
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Puzzles
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search title..."
          inputProps={{ 'aria-label': 'search' }}
          onKeyDown={(e: any) => handleSearch(e)}
        />
      </Search>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleClickOpen()}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box>
          <Tooltip title="Filter list">
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <FormProvider {...methods}>
              <FormControl sx={{ m: 3 }} component="form" variant="standard">
                <CheckboxesGroup
                  name="status"
                  control={methods.control}
                  label="Status"
                  data={status}
                  required={false}
                />

                <Stack sx={{ mb: 1 }}>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Start Date
                  </FormLabel>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Controller
                      control={methods.control}
                      name="startDateCondition"
                      render={({ field: { onChange, value, ref, name } }) => (
                        <TextField
                          select
                          label="Condition"
                          onChange={onChange}
                          inputRef={ref}
                          sx={{ width: '200px', mr: 2 }}
                          name={name}
                          value={value ?? ''}
                        >
                          {conditions.map((item: string) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePickerField
                        name="startDate"
                        control={methods.control}
                        label="Value"
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>
                <Stack sx={{ mb: 1 }}>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    End Date
                  </FormLabel>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Controller
                      control={methods.control}
                      name="endDateCondition"
                      render={({ field: { onChange, value, ref, name } }) => (
                        <TextField
                          select
                          label="Condition"
                          onChange={onChange}
                          inputRef={ref}
                          sx={{ width: '200px', mr: 2 }}
                          name={name}
                          value={value ?? ''}
                        >
                          {conditions.map((item: string) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePickerField name="endDate" control={methods.control} label="Value" />
                    </LocalizationProvider>
                  </Box>
                </Stack>
                <Stack direction="row" sx={{ mt: 1 }} spacing={1}>
                  <Button variant="outlined" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleSubmit(handleSubmitFilter)}
                    type="submit"
                  >
                    Filter
                  </Button>
                </Stack>
              </FormControl>
            </FormProvider>
          </Popover>
        </Box>
      )}
    </Toolbar>
  )
}

export function EnhancedTablePuzzle(props: EnhancedTablePuzzleProps) {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Puzzle>('_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { headCells } = props
  const [dataDialog, setDataDialog] = React.useState()
  const [firstLoading, setFirstLoading] = React.useState(true)
  const [puzzles, setPuzzles] = React.useState<any>([])
  const { data } = usePuzzle()

  React.useEffect(() => {
    if (data) {
      setPuzzles(data.data.puzzles)
    }
  }, [data])
  const handleDialog = (id: string) => {
    const data = puzzles.find((item: any) => item._id === id)
    setDataDialog(data)
    setOpen(true)
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Puzzle) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = puzzles.map((n: any) => n._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - puzzles.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
          setPuzzles={setPuzzles}
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
              rowCount={puzzles.length}
              headCells={puzzleCells}
              setFirstLoading={setFirstLoading}
            />
            <TableBody>
              {stableSort(puzzles, getComparator(order, orderBy), firstLoading)
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
                        align="right"
                      >
                        {row._id.toString().slice(-5)}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">
                        <Image src={row.image.toString()} width={70} height={50} alt="image" />
                      </TableCell>

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
          count={puzzles.length}
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
      <FormDialog dataDialog={dataDialog} setOpen={setOpen} open={open} />
    </Box>
  )
}
