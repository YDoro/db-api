import type { Router } from "express";
import adapt from "../adapters/express/adapt-express-routes";
import { HandleDocumentRead } from "../handlers/document";

export default (router: Router) => {
    router.get("/*", adapt(HandleDocumentRead))
}