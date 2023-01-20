import { HeadCell, Order } from './campaign'

export interface Counterpart {
  _id: string
  image: string
  nameOfShop: string
  phone: string
  headquarter: string
  action: string
}

export interface HeadCellCounterpart {
  disablePadding: boolean
  id: keyof Counterpart
  label: string
  numeric: boolean
}

export interface EnhancedTableHeadCounterpartProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Counterpart) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: HeadCellCounterpart[]
}

export interface EnhancedTableUserProps {
  headCells: Array<HeadCellCounterpart>
  userList: any
}
