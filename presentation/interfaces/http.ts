export interface Request {
    url: string
    body?: any
    query?: string
}

export interface Response {
    status: number
    data?: any
}