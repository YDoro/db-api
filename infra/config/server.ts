import app from "express";
import middlewares from "./middlewares";
import routes from "./routes";

const App = app();
middlewares(App);
routes(App);
export default App;
