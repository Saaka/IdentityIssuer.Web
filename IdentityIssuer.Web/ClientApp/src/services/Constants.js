let Constants = class Constants {};

Constants.ApiRoutes = class ApiRoutes {
    static get LOGIN() {
        return "auth/login";
    }
    static get GET_USER() {
        return "auth/user";
    }
};

export {Constants};