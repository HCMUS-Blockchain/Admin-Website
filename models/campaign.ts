export type Order = 'asc' | 'desc'
export interface Campaign {
  _id: string
  name: string
  dateBegin: number
  dateEnd: number
  description: string
  status: string
  typeOfRandom: string
  action: string
  games: Array<string>
  counterpartID: any
  image: string
  nameOfShop: string
  remainingVoucher: number
}

export interface CampaignImage {
  image: string
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof Campaign
  label: string
  numeric: boolean
}

export interface EnhancedTableHeadProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Campaign) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: HeadCell[]
}

export interface ColorStatus {
  [key: string]: string
}

export interface EnhancedTableToolbarProps {
  numSelected: number
  selected: Array<string>
  setSelected: any
  setCampaigns: any
}

export enum statusCampaign {
  PENDING,
  HAPPENING,
  DONE,
  ERROR,
}

export interface EnhancedTableProps {
  headCells: Array<HeadCell>
}
