import Weather from "../../app/weather/Weather";

export const routes = [
    {
        id: 1,
        name: 'weather',
        iconClass: 'weather',
        routeTo: '/',
        component: Weather,
        permissionSection: true,
    },
];
