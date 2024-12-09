import type { Request } from "../../presentation/interfaces/http";
import type { DocumentInsertion } from "../entities/request";

export type RequestToDocumentInsertionMapper = (request: Request) => DocumentInsertion;
