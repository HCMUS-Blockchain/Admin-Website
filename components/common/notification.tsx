// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode, useEffect } from 'react'

// ** MUI Imports
import { Box, Badge } from '@mui/material'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { io } from 'socket.io-client'

// ** Icons Imports
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useNotification } from '@/hooks/useNotification'
import { useAuth } from '@/hooks'
import dayjs from 'dayjs'

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '& .MuiMenu-list': {
    padding: 0,
  },
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0,
  },
}

// ** Styled PerfectScrollbar component
const PerfectScrollbarComponent = styled(PerfectScrollbar)({
  ...styles,
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem',
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75),
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})
const socket = io('http://localhost:3001', { transports: ['websocket'] })

const NotificationDropdown = () => {
  const { data, updateSeen } = useNotification()
  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [noti, setNoti] = useState<any>([])
  const [number, setNumber] = useState(0)
  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const handleDropdownOpen = async (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
    setNumber(0)
    await updateSeen()
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (data) {
      setNoti(data.data.notifications)
      setNumber(data.data.count)
    }
  }, [data])
  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbarComponent options={{ wheelPropagation: false, suppressScrollX: true }}>
          {children}
        </PerfectScrollbarComponent>
      )
    }
  }
  useEffect(() => {
    socket.on('Admin', (arg: any) => {
      const isExist = noti.every((item: any) => item._id !== arg._id)
      if (isExist) {
        setNoti((pre: any) => [...pre, { ...arg }])
        setNumber((number) => number + 1)
      }
    })
    return () => {
      socket.off('Admin')
    }
  }, [])

  return (
    <Fragment>
      <IconButton
        // color="inherit"
        aria-haspopup="true"
        onClick={handleDropdownOpen}
        aria-controls="customized-menu"
      >
        {number > 0 ? (
          <Badge badgeContent={number} color="primary">
            <NotificationsNoneIcon />
          </Badge>
        ) : (
          <NotificationsNoneIcon />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size="small"
              label={`${number} new`}
              color="primary"
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        {noti ? (
          <ScrollWrapper>
            {noti.map((item: any) => (
              <MenuItem onClick={handleDropdownClose} key={item._id}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Avatar alt="Flora" src={item.image} />
                  <Box
                    sx={{
                      mx: 4,
                      flex: '1 1',
                      display: 'flex',
                      overflow: 'hidden',
                      flexDirection: 'column',
                    }}
                  >
                    <MenuItemTitle>{item.title}</MenuItemTitle>
                    <MenuItemSubtitle variant="body2">{item.description}</MenuItemSubtitle>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {dayjs().isSame(item.createdAt, 'day')
                      ? 'Today'
                      : dayjs(item.createdAt).format('DD/MM').toString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </ScrollWrapper>
        ) : null}
        {/* <MenuItem
          disableRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button fullWidth variant="contained" onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem> */}
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
