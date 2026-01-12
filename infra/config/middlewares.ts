import type { Express } from "express";
import express from "express";
import { adaptMiddleware } from "../../adapters/middleware";
import { CacheMiddleware } from "../../middlewares/express/cache";
import { CorsMiddleware } from "../../middlewares/express/cors";

export default (app: Express) => {
    app.use(adaptMiddleware(new CorsMiddleware()));
    app.use(express.json({limit: "10mb"}))
    app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
    app.use(adaptMiddleware(new CacheMiddleware()));
};
