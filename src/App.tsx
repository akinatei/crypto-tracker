import React from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>()
  const [selected, setSelected] = useState<Crypto | null>()
  const [data, setData] = useState<ChartData<'line'>>()
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
    },
  })
  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
    axios.get(url).then((response) => {
      setCryptos(response.data)
    })
  }, [])
    
    return (
      <>
    <div className="App">
      <select onChange={(e) => {
        const c = cryptos?.find((x) => x.id === e.target.value)
        //console.log(c)
        setSelected(c)
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily')
        .then((response) => {
          console.log('Getting crypto prices...')
          console.log(response.data)
          setData({
            labels: [1, 2, 3, 4],
            datasets: [
              {
                label: 'Dataset 1',
                data: [4, 7, 10, 3],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          });
        });
      }} defaultValue='default'>
      <option value='default'>Choose an option</option>
      {cryptos ? 
      cryptos.map((crypto) => {
      return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
    }) : null}
    </select>
    </div>
    {selected ? <CryptoSummary crypto={selected} /> : null}
    {data ?(
      <div style={{ width: 500 }}>
        <Line options={options} data={data} /> 
      </div>
    ) : null}
    </>
    )
  }

export default App;
