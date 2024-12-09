import { closeConnection, connect, getDatabase } from "./infra/config/database";
import App from "./infra/config/server";
import { MongoSeeder } from "./infra/seeds";
const PORT = process.env.PORT || 8000;

process.on("SIGTERM", async () => {
    await closeConnection();
});

connect()
    .then(async () => {
        if (process.env.MIGRATE_DB === "true") {
            await MongoSeeder(await getDatabase());
        }
        App.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
