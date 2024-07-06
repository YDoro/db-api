import type { Express } from "express";
import express from "express";

export default (app: Express) => {
    app.use(express.json());
};
