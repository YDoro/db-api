import type { Request, Response } from "../presentation/interfaces/http";

export default async (req: Request): Promise<Response> => {
    return { status: 200, data: "OK" };
};
