import type { Request, Response } from "../interfaces/presentation"

export default async (req: Request): Promise<Response> => {
    return { status: 200, data:"OK" }
}