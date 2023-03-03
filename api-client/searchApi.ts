import axios from 'axios'
import axiosClient from './axiosClient'

export const searchApi = {
  searchCampaign(keyword: any) {
    return axiosClient.get('admin/search/campaign', { params: keyword })
  },
  searchCounterpart(keyword: any) {
    return axiosClient.get('admin/search/counterpart', { params: keyword })
  },
  searchUser(keyword: any) {
    return axiosClient.get('admin/search/user', { params: keyword })
  },
  searchPayment(keyword: any) {
    return axiosClient.get('admin/search/payment', { params: keyword })
  },
  searchPuzzle(keyword: any) {
    return axiosClient.get('admin/search/puzzle', { params: keyword })
  },
}
