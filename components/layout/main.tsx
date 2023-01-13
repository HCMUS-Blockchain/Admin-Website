import { useAuth } from '@/hooks'
import { LayoutProps } from '@/models/index'
import { Box, Stack, Toolbar } from '@mui/material'
import { Auth } from '../common'
import { HeaderComponent } from '../common/header/header'

const drawerWidth = 240
export function MainLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <Stack minHeight="100vh">
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <HeaderComponent />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </Stack>
    </Auth>
  )
}
