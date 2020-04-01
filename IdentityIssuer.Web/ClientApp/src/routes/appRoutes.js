import {Dashboard} from "views/exports";
import {RouteNames} from "./names";

const appRoutes = [
    {
        useAuth: true,
        path: RouteNames.Home,
        component: Dashboard,
        name: "Home",
        icon: "home"
    },
    {
        redirect: true,
        path: RouteNames.App,
        to: RouteNames.Home,
        name: "Home"
    }
];

export default appRoutes;