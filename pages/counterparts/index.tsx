import { EnhancedTableCounterpart } from '@/components/counterparts'
import { MainLayout } from '@/components/layout'
import { Box, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Counterparts
        </Typography>
      </Box>
      <Divider />
      <EnhancedTableCounterpart />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
