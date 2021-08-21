import Weather from "../../app/weather/Weather";
import Chat from "../../app/chat/Chat";

export const routes = [
    {
        id: 1,
        name: 'weather',
        iconClass: 'weather',
        routeTo: '/',
        component: Weather,
        permissionSection: true,
    },
    {
        id: 2,
        name: 'weather',
        iconClass: 'weather',
        routeTo: '/weather',
        component: Weather,
        permissionSection: true,
    },
    {
        id: 3,
        name: 'chat',
        iconClass: 'chat',
        routeTo: '/chat',
        component: Chat,
        permissionSection: true,
    },
    {
        id: 4,
        name: 'user-chat',
        iconClass: 'chat',
        routeTo: '/user/chat',
        component: Chat,
        permissionSection: true,
    },
];
