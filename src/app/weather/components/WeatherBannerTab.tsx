/* eslint-disable react/jsx-props-no-spreading */
import 'react-tabs/style/react-tabs.css'
import 'rc-slider/assets/index.css'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import styled from 'styled-components'
import WeatherBanner from './WeatherBanner'
import { Card } from 'antd'

const { Handle } = Slider

const WeatherBannerTab = ({ location, forecastOfDay, locale, unit, onLocationClick }: any) => {
  const [tabIndex, setTabIndex] = useState(0)

  const renderTabPanel = (item: any, displayUnit: any) => {
    return (
      <TabPanel key={`tp${item.dt}`}>
        <WeatherBanner forecastNow={item} unit={displayUnit} />
      </TabPanel>
    )
  }

  const renderTab = (item: any, displayLocale?: any) => {
    const localeRegion = displayLocale || 'en_en'
    if (item) {
      return <Tab key={`t${item.dt}`}>{moment.unix(item.dt).locale(localeRegion).format('a h:mm')}</Tab>
    }
    return <div />
  }

  const handle = (params: any) => {
    const { value, dragging, index, ...restProps } = params
    return (
      <Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
        <Handle value={value} {...restProps} />
      </Tooltip>
    )
  }

  const marks: any = {}
  forecastOfDay.forEach((item: any, index: any) => {
    marks[index] = item.moment.locale(locale).format('a h:mm')
  })

  return (
    <Container>
      <Card className="shadow-md bg-gray-100 rounded-xl">
        <LocationText onClick={onLocationClick}>{location}</LocationText>
        <Tabs selectedIndex={tabIndex}>
          {forecastOfDay.map((item: any) => renderTabPanel(item, unit))}
          <TabList style={{ display: 'none' }}>{forecastOfDay.map((item: any) => renderTab(item))}</TabList>
        </Tabs>
      </Card>
      <TabContainer>
        <Slider
          min={0}
          max={forecastOfDay.length - 1}
          value={tabIndex}
          handle={handle}
          onChange={e => setTabIndex(e)}
          marks={marks}
        />
      </TabContainer>
    </Container>
  )
}

WeatherBannerTab.defaultProps = {
  unit: 'metric',
  locale: 'en_en',
  forecastOfDay: [],
}

WeatherBannerTab.propTypes = {
  location: PropTypes.string.isRequired,
  forecastOfDay: PropTypes.arrayOf(
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
  unit: PropTypes.string,
  locale: PropTypes.string,
  onLocationClick: PropTypes.func,
}

export default WeatherBannerTab

const LocationText = styled.div`
  font-size: 3rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const TabContainer = styled.div`
  margin: 0.8rem 0.8rem;
  padding-bottom: 1.5rem;
`
