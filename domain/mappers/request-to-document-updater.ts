import type { Request } from "../../presentation/interfaces/http";
import type { DocumentUpdater } from "../entities/request";

export type RequestToDocumentUpdaterMapper = (request: Request) => DocumentUpdater;
