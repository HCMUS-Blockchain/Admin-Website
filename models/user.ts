import { HeadCell, Order } from './campaign'

export interface User {
  _id: string
  fullName: string
  avatar: string
  email: string
  role: string
  action: string
}

export interface HeadCellUser {
  disablePadding: boolean
  id: keyof User
  label: string
  numeric: boolean
}

export interface EnhancedTableHeadUserProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: HeadCellUser[]
}

export interface EnhancedTableUserProps {
  headCells: Array<HeadCellUser>
  userList: any
}
