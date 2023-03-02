import { campaignApi, searchApi } from '@/api-client'
import { Campaign } from '@/models'
import dayjs from 'dayjs'
import useSWR from 'swr'
export function useCampaign() {
  const { data, error, mutate } = useSWR('/admin/campaigns', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getAllCampaigns() {
    await campaignApi.getAllCampaigns()
  }

  async function searchCampaign(payload: any) {
    const result = await searchApi.searchCampaign(payload)
    mutate(result, false)
  }

  async function updateCampaign(body: any, x: any) {
    const object = JSON.parse(JSON.stringify(Object.fromEntries(body)))
    const item = data.data.campaigns.findIndex((obj: any) => obj._id === object.id)
    if (dayjs().isBefore(x.dateBegin)) {
      data.data.campaigns[item].status = 'ACCEPTED'
    } else {
      data.data.campaigns[item].status = 'HAPPENING'
    }
    await campaignApi.updateCampaign(body)
    mutate(data, true)
  }

  async function refuseCampaign(body: any) {
    const object = JSON.parse(JSON.stringify(Object.fromEntries(body)))
    const item = data.data.campaigns.findIndex((obj: any) => obj._id === object.id)

    data.data.campaigns[item].status = 'NOT_ACCEPTED'
    await campaignApi.refuseCampaign(body)
    mutate(data, true)
  }
  return {
    data,
    error,
    getAllCampaigns,
    updateCampaign,
    searchCampaign,
    refuseCampaign,
  }
}
