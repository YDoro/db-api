import type { Request, Response } from "express";
import { withErrorHandling } from "../../decorators/request-error-handler";
import type { RequestHandler } from "../../presentation/contracts/request-handler";
import type { Request as Req } from "../../presentation/interfaces/http";

export default (handler: RequestHandler) =>
    async (req: Request, res: Response) => {
        try {
            const adaptedRequest: Req = {
                url: req.url.split("?")[0].replaceAll('//', '/'),
                body: req.body,
                query: req.url.split("?")[1] || undefined
            }
            
            const response = await withErrorHandling(handler)(adaptedRequest)

            res.status(response.status).json(response.data)
        } catch (err) {
            res.status(500).json({ message: "oops something whent wrong" })
        }
    }