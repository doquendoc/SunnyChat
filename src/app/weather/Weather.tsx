import * as React from 'react';
import './Weather.scss';
import ReactWeather, {useOpenWeather} from 'react-open-weather';

const Weather = () => {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'cbab533431ca82dd7835d5e55f9f9a9b',
        lat: '23.13302',
        lon: '-82.38304',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)

    });

    return (
        <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast
        />
    );
};


export default Weather;

