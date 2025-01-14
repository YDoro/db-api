import type { Middleware } from "../../adapters/middleware";
import type { Request, Response } from "../../presentation/interfaces/http";

export class CorsMiddleware implements Middleware {
    async handle(request: Request, response: Response): Promise<void> {
        response.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
            "Access-Control-Max-Age": "86400",
        };

        if (request.method === "OPTIONS") {
            response.status = 204;
        }
    }
}
