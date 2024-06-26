import { Router } from "express";
import adapt from "../adapters/express/adapt-express-routes";
import healthcheck from "../handlers/healthcheck";

export default (router:Router) => {
    router.get('/healthcheck',adapt(healthcheck))
}