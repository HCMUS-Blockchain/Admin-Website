import { storeApi } from '@/api-client'
import { counterpartCell } from '@/constants'
import { useCounterpart } from '@/hooks'
import defaultImage from '@/images/default_image.png'
import { Order } from '@/models/campaign'
import { Counterpart, EnhancedTableHeadCounterpartProps } from '@/models/counterpart'
import { getComparator, stableSort } from '@/utils/campaigns'
import BlockIcon from '@mui/icons-material/Block'
import InfoIcon from '@mui/icons-material/Info'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Toolbar,
  Typography,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import Image from 'next/image'
import * as React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '@/utils/campaigns/styles'
import SearchIcon from '@mui/icons-material/Search'

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
function EnhancedTableToolbar() {
  const { searchCounterpart } = useCounterpart()
  const handleSearch = async (e: any) => {
    if (e.key === 'Enter') {
      await searchCounterpart({ keyword: e.target.value })
    }
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Counterpart List
      </Typography>

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search name, phone or headquarter..."
          inputProps={{ 'aria-label': 'search' }}
          onKeyDown={(e: any) => handleSearch(e)}
        />
      </Search>
    </Toolbar>
  )
}

export function EnhancedTableCounterpart() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Counterpart>('_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [openStore, setOpenStore] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [counterparts, setCounterparts] = React.useState([])
  const [temp, setTemp] = React.useState({
    id: '',
    isBlock: false,
  })
  const [stores, setStores] = React.useState<any>([])

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

  const handleDetail = async (id: string) => {
    try {
      setStores([])
      const result = await storeApi.getStore(id)
      setStores(result.data.stores)
      setOpenStore(true)
    } catch (e) {
      console.log(e)
    }
  }
  const handleStoreClose = () => {
    setOpenStore(false)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
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
                          <>
                            <Tooltip title="Unblock">
                              <IconButton
                                onClick={() => handleDialog(row._id.toString(), false)}
                                color="warning"
                              >
                                <BlockIcon sx={{ p: 0, color: 'gray' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Detail">
                              <IconButton
                                onClick={() => handleDetail(row._id.toString())}
                                color="warning"
                              >
                                <InfoIcon sx={{ p: 0, color: 'gray' }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Block">
                              <IconButton
                                onClick={() => handleDialog(row._id.toString(), true)}
                                color="warning"
                              >
                                <BlockIcon sx={{ p: 0, color: 'red' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Detail">
                              <IconButton
                                onClick={() => handleDetail(row._id.toString())}
                                color="warning"
                              >
                                <InfoIcon sx={{ p: 0, color: 'gray' }} />
                              </IconButton>
                            </Tooltip>
                          </>
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

      <Dialog
        open={openStore}
        onClose={handleStoreClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Brands</DialogTitle>
        <DialogContent dividers={true}>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              maxHeight: '600px',
              overflow: 'auto',
            }}
          >
            {stores.length > 0 ? (
              stores.map((item: any) => (
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  key={item.title}
                >
                  <Box key={item._id} width="100%">
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              display: 'block',
                              overflow: ' hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              width: '210px',
                              cursor: 'pointer',
                            }}
                            component="span"
                            color="text.primary"
                          >
                            {item.title}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'block' }}
                              variant="body2"
                              component="span"
                              color="text.primary"
                            >
                              {item.description.split('\n')[0]}
                            </Typography>
                            <Typography
                              sx={{
                                display: 'block',
                                overflow: ' hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '210px',
                              }}
                              variant="body2"
                              component="span"
                              color="text.primary"
                            >
                              {item.description.split('\n')[1]}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <Divider />
                  </Box>
                </Stack>
              ))
            ) : (
              <Box width="100%">
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography component="span" color="text.primary">
                        This counterpart does not any brands !!
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStoreClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
