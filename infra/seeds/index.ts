import type { Db } from "mongodb";
import { migrations as collectionMigrations } from "./_collections";
import { migrations as userMigrations } from "./_users";

export interface Seeder<t> {
    collection: string;
    data: Array<t>;
}

export const MongoSeeder = async (db: Db): Promise<boolean> => {
    try {
        // TODO - import all other files dynamically
        await Promise.all(
            [collectionMigrations, userMigrations].map(async (migration) => {
                await db.dropCollection(migration.collection);
                const col = await db.createCollection(migration.collection);
                await col.insertMany(migration.data);
            }),
        );
    } catch (err) {
        console.error(err);
    }

    return true;
};
