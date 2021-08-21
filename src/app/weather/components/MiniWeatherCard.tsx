import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { iconCodeMapping } from './WeatherIcon'
import { Card, Divider } from 'antd'

/**
 * Render a daily cards containing a weather icon and the minimum and maximum temperature
 *
 * @param {function} onClick clicking callback
 * @param {object[]} forecastList forecast data to render
 * @param {boolean} isSelected render whether it's selected or not
 * @param {string} unit the unit format for figures, only accepting 'metric' for now
 * @param {string} locale locale for time formating
 */
const MiniWeatherCard = ({ onClick, forecastList, isSelected, unit, locale }: any) => {
  const [cssProps, setCssPops] = useState(false)
  if (forecastList !== undefined && forecastList.length > 0) {
    const first = forecastList[0]
    // find maximum and minimum temperature of the given list
    const tempMaxAndMin = forecastList.reduce(
      (acc: any, current: any) => {
        if (current.temp_max > acc.max) {
          acc.max = current.temp_max
        }
        if (current.temp_min < acc.min) {
          acc.min = current.temp_min
        }
        return acc
      },
      { max: Number.MIN_VALUE, min: Number.MAX_VALUE },
    )
    return (
      <Root>
        <Container isSelected={isSelected}>
          <Card
            className={`rounded-xl shadow-lg ${cssProps ? '!bg-gray-100' : 'bg-white '}`}
            onMouseEnter={e => setCssPops(true)}
            onMouseLeave={e => setCssPops(false)}
            onClick={onClick}
          >
            <Text>{moment.unix(first.dt).locale(locale).format('dddd')}</Text>
            <Divider orientation="left">
              <Icon src={iconCodeMapping[first.icon]} />
            </Divider>
            <Text>
              {Math.round(tempMaxAndMin.max * 10) / 10}
              &deg;
              {unit === 'metric' ? 'C' : 'F'}
            </Text>
            <Text>
              {Math.round(tempMaxAndMin.min * 10) / 10}
              &deg;
              {unit === 'metric' ? 'C' : 'F'}
            </Text>
          </Card>
        </Container>
      </Root>
    )
  }
  return <div />
}

MiniWeatherCard.defaultProps = {
  onClick: () => {},
  isSelected: false,
  unit: 'metric',
  locale: 'zh-tw',
  forecastList: [],
}

MiniWeatherCard.propTypes = {
  onClick: PropTypes.func,
  forecastList: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      clouds: PropTypes.number.isRequired,
      wind: PropTypes.number.isRequired,
    }),
  ),
  isSelected: PropTypes.bool,
  unit: PropTypes.string,
  locale: PropTypes.string,
}

export default MiniWeatherCard

const Root = styled.div`
  min-width: 20%;
`

const Container: any = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
`

const Text = styled.div`
  text-align: center;
  line-height: normal;
  padding: 0.5rem 0rem;
  font-size: 1.2rem;
`

const Icon = styled.img`
  align-self: center;
  line-height: normal;
  width: 3rem;
  height: 3rem;
`
