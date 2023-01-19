import axiosClient from './axiosClient'

export const campaignApi = {
  updateCampaign(data: any) {
    return axiosClient.post('admin/campaigns', data)
  },
  getAllCampaigns() {
    return axiosClient.get('/admin/campaigns')
  },
}
