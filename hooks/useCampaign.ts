import { campaignApi } from '@/api-client'
import { Campaign } from '@/models'
import useSWR from 'swr'
export function useCampaign() {
  const { data, error, mutate } = useSWR('/admin/campaigns', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getAllCampaigns() {
    await campaignApi.getAllCampaigns()
    // await mutate()
    // mutate([...data, newCampaign])
  }

  async function updateCampaign(body: any) {
    const object = JSON.parse(JSON.stringify(Object.fromEntries(body)))
    const item = data.data.campaigns.findIndex((obj: any) => obj._id === object.id)
    data.data.campaigns[item].status = 'HAPPENING'
    await campaignApi.updateCampaign(body)
    mutate(data, true)
  }

  // async function updateCampaigns(payload: any, values: any) {
  //   await campaignApi.updateCampaigns(payload)
  //   await mutate([...data.data.campaigns, values], true)
  // }

  // async function deleteMultipleCampaigns(_id: Array<string>) {
  //   const newList = data.data.campaigns.filter((item: Campaign) => !_id.includes(item._id))
  //   data.data.campaigns = newList
  //   await campaignApi.deleteMultipleCampaigns(_id)
  //   await mutate(data, true)
  // }

  // async function deleteSingleCampaigns(_id: string) {
  //   const newList = data.data.campaigns.filter((item: Campaign) => item._id !== _id)
  //   data.data.campaigns = newList
  //   await campaignApi.deleteSingleCampaigns(_id)
  //   await mutate(data, true)
  // }

  return {
    data,
    error,
    getAllCampaigns,
    updateCampaign,
    // updateCampaigns,
    // deleteSingleCampaigns,
    // deleteMultipleCampaigns,
  }
}
