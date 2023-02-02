import axios from 'axios'
import axiosClient from './axiosClient'

export const searchApi = {
  searchCampaign(keyword: any) {
    return axiosClient.get('admin/search/campaign', { params: keyword })
  },
  searchBrand(keyword: any) {
    return axiosClient.get('admin/search/store', { params: keyword })
  },
  searchUser(keyword: any) {
    return axiosClient.get('admin/search/user', { params: keyword })
  },
}
