import { closeConnection, connect, getClient } from "./config/database";
import App from "./config/server";
const PORT = process.env.PORT || 8000;

process.on("SIGTERM", async () => {
    await closeConnection();
});

connect()
    .then(() => {
        App.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
