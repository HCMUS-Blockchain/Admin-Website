export type Order = 'asc' | 'desc'
export interface Puzzle {
  _id: string
  title: string
  dateBegin: number
  dateEnd: number
  image: string
  action: string
  status: string
}

export interface HeadCellPuzzle {
  disablePadding: boolean
  id: keyof Puzzle
  label: string
  numeric: boolean
}

// export interface EnhancedTableHeadProps {
//   numSelected: number
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Campaign) => void
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
//   order: Order
//   orderBy: string
//   rowCount: number
//   headCells: HeadCell[]
//   setFirstLoading: any
// }

// export interface ColorStatus {
//   [key: string]: string
// }

// export interface EnhancedTableToolbarProps {
//   numSelected: number
//   selected: Array<string>
//   setSelected: any
//   setCampaigns: any
// }

// export enum statusCampaign {
//   PENDING,
//   HAPPENING,
//   DONE,
//   ERROR,
// }

export interface EnhancedTablePuzzleProps {
  headCells: Array<HeadCellPuzzle>
}

export interface EnhancedTablePuzzleToolbarProps {
  numSelected: number
  selected: Array<string>
  setSelected: any
  setPuzzles: any
}

export interface EnhancedTableHeadPuzzleProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Puzzle) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: HeadCellPuzzle[]
  setFirstLoading: any
}
