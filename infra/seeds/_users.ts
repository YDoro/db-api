import type { Seeder } from ".";
import type { User } from "../../domain/user";

export const migrations: Seeder<User> = {
    collection: "_users",
    data: [
        {
            name: "admin",
            authorization: "c3284d0f94606de1fd2af172aba15bf3",
        },
    ],
};
