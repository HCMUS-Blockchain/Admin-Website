import { MainLayout } from '@/components/layout'
import { EnhancedTableUser } from '@/components/users'
import { userCell } from '@/constants'
import { useUser } from '@/hooks/useUser'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography, Breadcrumbs } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary" variant="h6">
            Accounts
          </Typography>
        </Breadcrumbs>
      </Box>
      <Divider />
      <EnhancedTableUser headCells={userCell} />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
