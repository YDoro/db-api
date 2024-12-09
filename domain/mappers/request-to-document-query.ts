import type { Request } from "../../presentation/interfaces/http";
import type { DocumentQuery } from "../entities/request";

export type RequestToDocumentQueryMapper = (request: Request) => DocumentQuery;
