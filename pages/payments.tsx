import { MainLayout } from '@/components/layout'
import { EnhancedTablePayment } from '@/components/payments'
import { Box, Divider, Typography } from '@mui/material'

function PaymentScreen() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          History Transaction
        </Typography>
      </Box>
      <Divider />
      <EnhancedTablePayment />
    </Box>
  )
}

PaymentScreen.Layout = MainLayout

export default PaymentScreen
