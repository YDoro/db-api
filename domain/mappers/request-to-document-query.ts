import type { Request } from "../../presentation/interfaces/http";
import type { DocumentQuery } from "../entities/document";

export type RequestToDocumentQueryMapper = (request: Request) => DocumentQuery;
