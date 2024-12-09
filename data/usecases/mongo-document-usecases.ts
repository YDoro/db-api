import { ObjectId } from "mongodb";
import type { DocumentInsertion, DocumentQuery } from "../../domain/request";
import type { GetDocumentInsertionFromRequestUC } from "../../domain/request/usecases/get-document-insertion-from-request";
import type { GetDocumentQueryFromRequestUC } from "../../domain/request/usecases/get-document-query-from-request";
import type { Request } from "../../presentation/interfaces/http";
export class MongoDocumentUseCases implements GetDocumentInsertionFromRequestUC, GetDocumentQueryFromRequestUC {
    getDocumentInsertionFromRequest(req: Request): DocumentInsertion {
        const { url, body, query } = req;
        const [col, ...rest] = url.slice(1).split("/");
        const isSubDocumentInsertion = !!rest.filter((v) => v).length;
        const search: any = {};
        const filters: any[] = [];

        let updatePath = "";

        for (const segment of rest.filter((v) => v)) {
            if (ObjectId.isValid(segment)) {
                if (!search._id) {
                    search._id = new ObjectId(segment);
                    continue;
                }
                updatePath += ".$[element]";
                filters.push({ "element._id": new ObjectId(segment) });
                continue;
            }

            updatePath += `.${segment}`;
        }

        for (const arg of query?.split("&") || []) {
            const [param, value] = arg.split("=");
            search[`${param}`] = value;
        }

        const finaldocument = updatePath
            ? {
                  $push: { [updatePath.slice(1)]: body },
              }
            : body;

        return {
            collection: col,
            document: finaldocument,
            isSubDocumentInsertion,
            filter: search,
            arrayFilters: filters,
        };
    }

    getDocumentQueryFromRequest = (req: Request): DocumentQuery => {
        const { url, query } = req;
        const [col, ...rest] = url.slice(1).split("/");

        const pipelines: any[] = [];

        rest.filter((v) => v).forEach((segment, i, rest) => {
            if (ObjectId.isValid(segment)) {
                pipelines.push({
                    $match: {
                        _id: new ObjectId(segment),
                    },
                });
            } else {
                pipelines.push(
                    {
                        $unwind: `$${segment}`,
                    },
                    {
                        $replaceRoot: {
                            newRoot: `$${segment}`,
                        },
                    },
                );
            }
        });

        const match: any = {};
        // TODO - imporve types - query including types
        for (const arg of query?.split("&") || []) {
            const [param, value] = arg.split("=");
            match[`${param}`] = value;
        }

        pipelines.push({
            $match: match,
        });

        return { collection: col, pipeline: pipelines };
    };
}
