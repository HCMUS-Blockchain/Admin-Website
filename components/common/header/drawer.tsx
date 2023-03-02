import Logo from '@/images/logo.png'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PaymentIcon from '@mui/icons-material/Payment'
import ExtensionIcon from '@mui/icons-material/Extension'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material'
import Image from 'next/image'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
// import Link from 'next/link'
const drawerList = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    ref: '/',
  },
  {
    title: 'Campaigns',
    icon: <CampaignOutlinedIcon />,
    ref: '/campaigns',
  },
  {
    title: 'Accounts',
    icon: <BadgeOutlinedIcon />,
    ref: '/accounts',
  },
  {
    title: 'Counterparts',
    icon: <StoreOutlinedIcon />,
    ref: '/counterparts',
  },

  {
    title: 'Payments',
    icon: <PaymentIcon />,
    ref: '/payments',
  },
  {
    title: 'Puzzles',
    icon: <ExtensionIcon />,
    ref: '/puzzles',
  },
]
export const drawer = (
  <div>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Image src={Logo} alt="logo" width={150} height={64} />
    </Box>
    <List>
      {drawerList.map((item, index) => (
        <ListItem key={item.title} disablePadding>
          <Link sx={{ width: '100%' }} href={item.ref}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  </div>
)
