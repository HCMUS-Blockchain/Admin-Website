import { HeadCellPuzzle } from '@/models/puzzle'

export const puzzleCells: HeadCellPuzzle[] = [
  {
    id: '_id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'dateBegin',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'dateEnd',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]
