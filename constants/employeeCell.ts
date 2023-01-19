import { HeadCellUser } from '@/models'

export const userCell: HeadCellUser[] = [
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'avatar',
    numeric: false,
    disablePadding: false,
    label: 'Avatar',
  },
  {
    id: 'fullName',
    numeric: false,
    disablePadding: false,
    label: 'Full Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },

  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]
