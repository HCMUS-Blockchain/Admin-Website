import { EnhancedTableCounterpart } from '@/components/counterparts'
import { MainLayout } from '@/components/layout'
import { Box, Divider, Typography, Breadcrumbs } from '@mui/material'
import { useRouter } from 'next/router'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary" variant="h6">
            Counterparts
          </Typography>
        </Breadcrumbs>
      </Box>
      <Divider />
      <EnhancedTableCounterpart />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
