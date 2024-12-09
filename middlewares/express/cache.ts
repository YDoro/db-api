import type { NextFunction, Request, Response } from "express";
import { getClient } from "../../infra/config/cache";

// TODO - create a middleware adapter or check if we can create a "cache repository"
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.method === "GET") {
        const r = await getClient();
        const auth = req.headers?.authorization || "";
        const cached = await r.get(req.url + auth);

        if (cached) {
            const cachedResponse = JSON.parse(cached);
            res.status(cachedResponse.status).json(cachedResponse.data);
        }
    }

    next();
};
