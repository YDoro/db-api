import type { Express } from "express";
import express from "express";
import { adaptMiddleware } from "../../adapters/middleware";
import { CacheMiddleware } from "../../middlewares/express/cache";

export default (app: Express) => {
    app.use(express.json());
    app.use(adaptMiddleware(new CacheMiddleware()));
};
