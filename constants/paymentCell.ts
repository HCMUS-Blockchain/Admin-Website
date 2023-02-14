import { HeadCellPayment } from '@/models'

export const paymentCells: HeadCellPayment[] = [
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'accountID',
    numeric: false,
    disablePadding: false,
    label: 'AccountID',
  },
  {
    id: 'campaignName',
    numeric: false,
    disablePadding: false,
    label: 'Campaign',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Total Fee',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },

  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
]
