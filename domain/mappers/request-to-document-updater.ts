import type { Request } from "../../presentation/interfaces/http";
import type { DocumentUpdater } from "../entities/document";

export type RequestToDocumentUpdaterMapper = (request: Request) => DocumentUpdater;
