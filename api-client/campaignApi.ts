import axiosClient from './axiosClient'

export const campaignApi = {
  updateCampaign(data: any) {
    return axiosClient.post('admin/campaigns', data)
  },
  refuseCampaign(data: any) {
    return axiosClient.post('admin/campaigns/refuse', data)
  },
  getAllCampaigns() {
    return axiosClient.get('/admin/campaigns')
  },
}
