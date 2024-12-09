import type { RedisClientType } from "redis";
import redis from "redis";
import type { Request, Response } from "../../presentation/interfaces/http";

let client: RedisClientType | null = null;

export const getClient = async (): Promise<RedisClientType> => {
    if (client) return client;

    client = redis.createClient({
        url: process.env.CACHE_URL,
    });

    client.connect();

    return client;
};

export const setCacheForRequest = async (req: Request, res: Response): Promise<void> => {
    const r = await getClient();
    const auth = req.headers?.authorization || "";
    await r.set(req.url + auth, JSON.stringify({ status: res.status, data: res.data }), {
        EX: Number(process.env?.CACHE_TTL) || 60,
    });
};

export const clearCollectionRelatedCache = async (collection: string): Promise<void> => {
    const r = await getClient();

    let cursor = 0;
    do {
        try {
            const data = await r.scan(cursor, { MATCH: `/${collection}/*` });
            cursor = data.cursor;
            for (const key of data.keys) {
                await r.del(key);
            }
        } catch (err) {
            console.error(`could not remove cache for collection ${collection}`, err);
        }
    } while (cursor !== 0);
};
