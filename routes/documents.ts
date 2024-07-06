import type { Router } from "express";
import adapt from "../adapters/express/adapt-express-routes";
import { HandleDocumentCreation, HandleDocumentRead, HandleDocumentUpdate } from "../handlers/document";

export default (router: Router) => {
    router.get("/*", adapt(HandleDocumentRead));
    router.post("/*", adapt(HandleDocumentCreation));
    router.put("/*", adapt(HandleDocumentUpdate));
    //TODO - ensure to just update fields that exists in patch and replace on put
    router.patch("/*", adapt(HandleDocumentUpdate));
};
