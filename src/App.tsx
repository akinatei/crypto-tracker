import React from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line } from 'react-chartjs-2'
// import type { ChartData, ChartOptions } from 'chart.js'
// import moment from 'moment'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>()
  const [selected, setSelected] = useState<Crypto[]>([])
  const [range, setRange] = useState<number>(30)

  /*
  const [data, setData] = useState<ChartData<'line'>>()
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
    },
  })
  */

  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
    axios.get(url).then((response) => {
      setCryptos(response.data)
    }).catch((e) => {
      //console.log(e)
    })
  }, [])

  /*

  useEffect(() => {
    if(!selected) return
    axios.get(`https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&${range === 2 ? 'interval=daily' : 'interval=daily'}`)
    .then((response) => {
      console.log('Getting crypto prices...')
      console.log(response.data)
      setData({
        labels: response.data.prices.map(
          (price: number[]) => {
            return moment.unix(price[0]/10000).format(range===2 ? 'HH:MM' : 'MM-DD')
          }
        ),
        datasets: [
          {
            label: 'Dataset 1',
            data: response.data.prices.map(
              (price: number[]) => {
                return price[1].toFixed(2)
              }
            ),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      })
      setOptions(
        {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text:`${selected?.name} Price over last ` + range + (range === 1 ? ' Day.': ' Days.'),
            },
          },
        }
      )
    })
  }, [selected, range])

  */

useEffect(() => {
  console.log('SELECTED:', selected)
}, [selected])

function updateOwned(crypto: Crypto, amount: number): void {
    console.log('updateOwned',crypto, amount)
    let temp = [...selected]
    let tempObj = temp.find((c) => c.id === crypto.id)
    if (tempObj) {
      tempObj.owned = amount
      setSelected(temp)
    }
}
    return (
      <>
    <div className="App">
      <select onChange={(e) => {
        const c = cryptos?.find((x) => x.id === e.target.value) as Crypto
        //console.log(c)
        setSelected([...selected, c])

      }} 
      defaultValue='default'>
      <option value='default'>Choose an option</option>
      {cryptos ? 
      cryptos.map((crypto) => {
      return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
    }) : null}
    </select>
    
    {/* <select onChange={(e) => {
      setRange(parseInt(e.target.value))
    }}>
      <option value={30}>30 Days</option>
      <option value={7}>7 Days</option>
      <option value={2}>2 Day</option>
    </select> */}
  
    </div>

    {selected.map((s) => {
      return <CryptoSummary crypto={s} updateOwned={updateOwned} />
    })}

    {/* {selected ? <CryptoSummary crypto={selected} /> : null} */}


    {/* {data ?(
      <div style={{ width: 500 }}>
        <Line options={options} data={data} /> 
      </div>
    ) : null} */}

    {selected ? 'Your portfolio is worth $' + selected.map((s) => {
      if(isNaN(s.owned)){
        return 0
      }
      return s.current_price * s.owned
    }).reduce((prev, current) => {
      return prev + current
    }, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2}): null}
    </>
    )
  }

export default App;
