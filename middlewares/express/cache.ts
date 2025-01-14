import type { Middleware } from "../../adapters/middleware";
import { getClient } from "../../infra/config/cache";
import type { Request, Response } from "../../presentation/interfaces/http";

export class CacheMiddleware implements Middleware {
    async handle(request: Request, _response: Response): Promise<void> {
        if (request.method === "GET") {
            const r = await getClient();
            const auth = request.headers?.authorization || "";
            const cached = await r.get(request.url + auth);

            if (cached) {
                const cachedResponse = JSON.parse(cached);
                _response.status = cachedResponse.status;
                _response.data = cachedResponse.data;
            }
        }
    }
}
