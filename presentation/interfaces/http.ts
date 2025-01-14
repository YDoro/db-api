import type { IncomingHttpHeaders } from "node:http";

export interface Request {
    headers?: IncomingHttpHeaders;
    method: string;
    url: string;
    body?: any;
    query?: string;
    params?: Record<string, string>;
}

export interface Response {
    status: number;
    data?: any;
}
