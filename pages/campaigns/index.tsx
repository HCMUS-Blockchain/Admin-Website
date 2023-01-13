import { EnhancedTable } from '@/components/campaigns'
import { MainLayout } from '@/components/layout'
import { headCells } from '@/constants'
import { useCampaign } from '@/hooks'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()
  const { data, getAllCampaigns } = useCampaign()
  useEffect(() => {
    const fetchData = async () => {
      await getAllCampaigns()
    }
    fetchData()
  }, [getAllCampaigns])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Campaigns
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => route.push('./campaigns/create')}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <EnhancedTable headCells={headCells} campaignList={data?.data.campaigns || []} />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
