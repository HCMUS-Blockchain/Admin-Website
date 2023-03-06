import { EnhancedTable } from '@/components/campaigns'
import { MainLayout } from '@/components/layout'
import { headCells } from '@/constants'
import { useCampaign } from '@/hooks'
import AddIcon from '@mui/icons-material/Add'
import { Box, Breadcrumbs, Button, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()
  const { data, getAllCampaigns } = useCampaign()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary" variant="h6">
            Campaigns
          </Typography>
        </Breadcrumbs>
      </Box>
      <Divider />
      <EnhancedTable headCells={headCells} />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
