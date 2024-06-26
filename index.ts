import App from "./config/server";
const PORT = process.env.PORT || 8000;

App.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})