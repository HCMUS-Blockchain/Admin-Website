import { HeadCell } from '@/models'

export const headCells: HeadCell[] = [
  {
    id: '_id',
    numeric: true,
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'nameOfShop',
    numeric: false,
    disablePadding: false,
    label: 'Shop',
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
    id: 'typeOfRandom',
    numeric: true,
    disablePadding: false,
    label: 'Random Method',
  },
  {
    id: 'remainingVoucher',
    numeric: true,
    disablePadding: false,
    label: 'Remaining Vouchers',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]
