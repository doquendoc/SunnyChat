import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Weather.scss'

import WeatherWidget from './components/WeatherWidget'
// mock data for testing without API call
import testData from './testData.json'
import {Spline} from '../weather/graphs/TempDayGraph'
import {Col, Row} from 'antd'
import {SplineInversed} from '../weather/graphs/TempHourGraph'
import {valuesForDailyGraph, valuesForGraphs} from '../../shared/helpers/graphs.helpers'

const OPEN_WEATHER_MAP_KEY = 'cbab533431ca82dd7835d5e55f9f9a9b'

const cities: any = [
  { city: 'taipei', label: '🇹🇼 Taipei' },
  { city: 'tokyo', label: '🇯🇵 Tokyo' },
  { city: 'moscow', label: '🇷🇺 Moscow' },
  { city: 'sydney', label: '🇦🇺 Sydney' },
  { city: 'london', label: '🇬🇧 London' },
  { city: 'paris', label: '🇫🇷 Paris' },
  { city: 'mexico', label: '🇲🇽 Mexico' },
  { city: 'seattle', label: '🇺🇸 Seattle' },
  { city: 'washington', label: '🇺🇸 Washington' },
  { city: 'beijing', label: '🇨🇳 Beijing' },
]

export const WeatherContext = React.createContext({})

const Weather = () => {
  const params = new URLSearchParams(window.location.search)
  const city = params.get('city_index')

  const [cityIndex, setCityIndex] = useState<any>(city || 0)
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState('')
  const [dayTempList, setDayTempList] = useState([])

  const [completeForecast, setCompleteForecast] = useState([])

  const [forecastIdxFromCard, setForecastIdxFromCard] = useState(0)

  const fetchWeatherAsync = async (cityId: any) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: cityId,
          lang: 'en_en',
          appid: OPEN_WEATHER_MAP_KEY,
          units: 'metric',
        },
      })
      const transformData = await response.data.list.map((data: any) => ({
        dt: data.dt,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
        desc: data.weather[0].description,
        clouds: data.clouds.all,
        wind: data.wind.speed,
      }))
      setForecast(transformData)

      //   setDayTempList(statistics(response))
    } catch (err) {
      if (OPEN_WEATHER_MAP_KEY.length === 0) {
        // Use mock data if no key
        const transformData = await testData.list.map(data => ({
          dt: data.dt,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          humidity: data.main.humidity,
          icon: data.weather[0].icon,
          desc: data.weather[0].description,
          clouds: data.clouds.all,
          wind: data.wind.speed,
        }))
        setForecast(transformData)
        setError('')
      } else {
        setError(err.stack)
      }
    }
  }

  useEffect(() => {
    fetchWeatherAsync(cities[cityIndex].city)
  }, []) // notice the empty array here

  return (
    <div className="App">
      <WeatherContext.Provider value={{ setCompleteForecast, setForecastIdxFromCard }}>
        <Row className="!bg-white dark:bg-gray-800 shadow-md rounded-xl mb-10 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102 mr-7">
          <Col span={24} className="mx-2 pt-6 space-y-4">
            {error.length === 0 ? (
              <WeatherWidget
                config={{
                  location: cities[cityIndex].label,
                  unit: 'metric',
                  locale: 'en_en',
                  onLocationClick: () => {
                    if (cityIndex + 1 >= cities.length) {
                      setCityIndex(0)
                      fetchWeatherAsync(cities[0].city)
                    } else {
                      setCityIndex(cityIndex + 1)
                      fetchWeatherAsync(cities[cityIndex + 1].city)
                    }
                  },
                }}
                forecast={forecast}
              />
            ) : (
              <div>
                <h2>Unable to fetch weather data!</h2>
                <pre>{error}</pre>
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-6">
          <Col
            span={11}
            className="bg-white dark:bg-gray-800 p-2 mx-6 rounded-xl shadow-xl space-y-4 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102"
          >
            <Spline
              minList={valuesForGraphs(completeForecast || dayTempList, 'min')}
              maxList={valuesForGraphs(completeForecast || dayTempList, 'max')}
              avrgList={valuesForGraphs(completeForecast || dayTempList, 'avrg')}
            ></Spline>
          </Col>
          <Col
            span={11}
            className="bg-white dark:bg-gray-800 p-2 mx-6 rounded-xl shadow-xl space-y-4 transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102"
          >
            <SplineInversed
              avrgList={valuesForDailyGraph(completeForecast[forecastIdxFromCard] || [])}
            ></SplineInversed>
          </Col>
        </Row>
      </WeatherContext.Provider>
    </div>
  )
}

export default Weather
