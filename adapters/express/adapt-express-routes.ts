import type { Request, Response } from "express";
import type { Request as InternalReq, Response as InternalRes } from "../../interfaces/presentation";

type requestHandler = (req: InternalReq) => Promise<InternalRes>


export default (handler: requestHandler) => 
    async (req: Request, res: Response)=> {
    const adaptedRequest:InternalReq = {
        url: req.url.split("?")[0].replaceAll('//','/'),
        body: req.body,
        query: req.url.split("?")[1] || undefined
    }
    
    const response = await handler(adaptedRequest)
    //TODO - catch errors
    res.status(response.status).json(response.data)
}