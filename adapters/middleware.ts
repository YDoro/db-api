import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import type { Request, Response } from "../presentation/interfaces/http";

export interface Middleware {
    handle: (request: Request, response: Response) => Promise<void>;
}

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
        const request: Request = {
            body: req.body,
            headers: req.headers as Record<string, string>,
            method: req.method,
            params: req.params,
            query: req.query as unknown as string,
            url: req.url,
        };

        const response: Response = {
            status: 200,
            data: {},
        };

        try {
            await middleware.handle(request, response);
            Object.assign(req, request);
            next();
        } catch (error) {
            next(error);
        }
    };
};
