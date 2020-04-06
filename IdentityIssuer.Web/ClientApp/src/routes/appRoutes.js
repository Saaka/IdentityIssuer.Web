import {Dashboard, Unauthorized, About} from "views/exports";
import {RouteNames} from "./names";

const appRoutes = [
    {
        useAuth: true,
        requireAdmin: true,
        path: RouteNames.Home,
        component: Dashboard,
        name: "Home",
        icon: "home"
    },
    {
      useAuth: false,
      requireAdmin: false,
      path: RouteNames.About,
      component: About,
      name: "About",
      icon: "about"  
    },
    {
        hide: true,
        path: RouteNames.Unauthorized,
        component: Unauthorized,
        name: "Unauthorized"
    },
    {
        redirect: true,
        path: RouteNames.App,
        to: RouteNames.Home,
        name: "Home"
    }
];

export default appRoutes;