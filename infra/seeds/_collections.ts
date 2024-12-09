import type { Seeder } from ".";
import type { Collection } from "../../domain/entities/collection";

export const migrations: Seeder<Collection> = {
    collection: "_collections",
    data: [
        {
            name: "_users",
            config: {
                privacy: "protected",
                allowedOperations: ["create", "read", "update", "delete"],
                allowedUsers: ["admin"],
            },
        },
        {
            name: "_collections",
            config: {
                privacy: "private",
                allowedOperations: ["read"],
                allowedUsers: ["admin"],
            },
        },
    ],
};
