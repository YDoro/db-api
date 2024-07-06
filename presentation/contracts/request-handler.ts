import type { Request, Response } from "../interfaces/http";

export type RequestHandler = (req: Request) => Promise<Response>;
