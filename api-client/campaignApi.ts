import axiosClient from './axiosClient'

export const campaignApi = {
  create(payload: any) {
    return axiosClient.post('/campaigns', payload)
  },
  getAllCampaigns() {
    return axiosClient.get('/admin/campaigns')
  },
}
