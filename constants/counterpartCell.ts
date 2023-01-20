import { HeadCellCounterpart } from '@/models/counterpart'

export const counterpartCell: HeadCellCounterpart[] = [
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'nameOfShop',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },

  {
    id: 'headquarter',
    numeric: false,
    disablePadding: false,
    label: 'Headquarter',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]
