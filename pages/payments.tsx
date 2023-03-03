import { MainLayout } from '@/components/layout'
import { EnhancedTablePayment } from '@/components/payments'
import { Box, Divider, Typography, Breadcrumbs, Link } from '@mui/material'

function PaymentScreen() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary" variant="h6">
            Payments
          </Typography>
        </Breadcrumbs>
      </Box>
      <Divider />
      <EnhancedTablePayment />
    </Box>
  )
}

PaymentScreen.Layout = MainLayout

export default PaymentScreen
