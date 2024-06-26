import type { Application } from "express";
import express from "express";
import documents from "../routes/documents";
import healthcheck from "../routes/healthcheck";

export default (app:Application) =>{
    const router = express.Router()

    healthcheck(router)
    documents(router)
 
    app.use(router)
}