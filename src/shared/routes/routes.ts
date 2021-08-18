import Weather from "../../app/weather/Weather";
import WeatherTest from "../../app/WeatherTest/WeatherTest";

export const routes = [
    {
        id: 1,
        name: 'weather',
        iconClass: 'weather',
        routeTo: '/',
        component: WeatherTest,
        permissionSection: true,
    },
    // {
    //     id: 2,
    //     name: 'Weather',
    //     iconClass: 'Weather',
    //     routeTo: '/weatherTest',
    //     component: WeatherTest,
    //     permissionSection: true,
    // },
];
