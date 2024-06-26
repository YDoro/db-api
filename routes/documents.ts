import type { Router } from "express";
import adapt from "../adapters/express/adapt-express-routes";
import { HandleDocumentCreation, HandleDocumentRead } from "../handlers/document";

export default (router: Router) => {
    router.get("/*", adapt(HandleDocumentRead))
    router.post("/*", adapt(HandleDocumentCreation))
}