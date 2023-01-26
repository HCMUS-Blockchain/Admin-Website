import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
  } from 'chart.js'
  import { useEffect, useState } from 'react'
  import { Line } from 'react-chartjs-2'
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Voucher',
      },
    },
  }
  
  export interface LineChartInterface {
    dayOfTheYear: Array<any>
    usedVoucher: Array<number>
    releaseVoucher: Array<number>
  }
  
  export function LineChart({ dayOfTheYear, usedVoucher, releaseVoucher }: LineChartInterface) {
    const [data, setData] = useState<any>({
      labels: [],
      datasets: [
        {
          label: 'Release Voucher',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Used Voucher',
          data: [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  
    useEffect(() => {
      if (dayOfTheYear) {
        setData({ ...data, labels: dayOfTheYear })
      }
    }, [dayOfTheYear])
  
    useEffect(() => {
      if (usedVoucher || releaseVoucher) {
        const datasets = [
          {
            label: 'Release Voucher',
            data: releaseVoucher,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Used Voucher',
            data: usedVoucher,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ]
  
        setData({ ...data, datasets: datasets })
      }
    }, [usedVoucher, releaseVoucher])
    return <Line options={options} data={data} />
  }
  