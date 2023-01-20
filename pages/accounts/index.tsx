import { MainLayout } from '@/components/layout'
import { EnhancedTableUser } from '@/components/users'
import { userCell } from '@/constants'
import { useUser } from '@/hooks/useUser'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()
  const { data, getAllUsers } = useUser()
  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers()
    }
    fetchData()
  }, [getAllUsers])
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
      <EnhancedTableUser headCells={userCell} userList={data?.data.users || []} />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
