import type { Express } from "express";
import express from "express";
import { adaptMiddleware } from "../../adapters/middleware";
import { CacheMiddleware } from "../../middlewares/express/cache";
import { CorsMiddleware } from "../../middlewares/express/cors";

export default (app: Express) => {
    app.use(express.json());
    app.use(adaptMiddleware(new CorsMiddleware()));
    app.use(adaptMiddleware(new CacheMiddleware()));
};
