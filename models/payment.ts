import { Order } from './campaign'

export interface Payment {
  paymentID: string
  email: string
  accountID: string
  price: string
  status: string
  createdAt: number
  campaignName: string
  action: string
  _id: string
}

export interface HeadCellPayment {
  disablePadding: boolean
  id: keyof Payment
  label: string
  numeric: boolean
}

export interface EnhancedTableHeadPaymentProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Payment) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: HeadCellPayment[]
}

export interface EnhancedTableToolbarPaymentProps {
  numSelected: number
  selected: Array<string>
  setSelected: any
  setPayments: any
  payments: any
  setMessage: any
  setOpenSnackbar: any
  setSeverity: any
}

export interface EnhancedTablePaymentProps {
  headCells: Array<HeadCellPayment>
  paymentList: any
  setMessage: any
  setOpenSnackbar: any
  setSeverity: any
}
