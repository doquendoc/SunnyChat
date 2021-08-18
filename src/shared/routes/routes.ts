import Home from "../../app/home/Home";

export const routes = [
    {
        id: 1,
        name: 'Home',
        iconClass: 'home',
        routeTo: '/',
        component: Home,
        permissionSection: true,
    },
];
