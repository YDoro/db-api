import type { Express } from "express";
import express from "express";
import CacheMiddleware from "../middlewares/express/cache";

export default (app: Express) => {
    app.use(express.json());
    app.use(CacheMiddleware);
};
