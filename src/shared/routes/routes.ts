import Weather from "../../app/weather/Weather";
import Chat from "../../app/chat/Chat";

export const routes = [
    {
        id: 1,
        name: 'weather',
        iconClass: 'Weather',
        routeTo: '/',
        component: Weather,
        permissionSection: true,
    },
    {
        id: 2,
        name: 'chat',
        iconClass: 'Chat',
        routeTo: '/chat',
        component: Chat,
        permissionSection: true,
    },
];
