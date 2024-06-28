import type { RequestHandler } from "../presentation/contracts/request-handler";
import type { Request } from "../presentation/interfaces/http";


export function withErrorHandling(originalMethod: RequestHandler): RequestHandler {
    return async (req: Request) => {
        try {
            const result = await originalMethod(req);
            return result;
        } catch (err) {
            console.error(err)
            return { status: 500, data: { message: "Internal error, try again later or contact the support!" } }
        }
    }
}