import type { Request } from "../../presentation/interfaces/http";
import type { DocumentInsertion } from "../entities/document";

export type RequestToDocumentInsertionMapper = (request: Request) => DocumentInsertion;
