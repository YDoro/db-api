import { type Document, ObjectId } from "mongodb";
import type { Request } from "../../presentation/interfaces/http";

type insertion = {
    collection: string;
    isSubDocumentInsertion: boolean;
    document: any;
    filter: Document;
    arrayFilters: any[];
};

export default (req: Request): insertion => {
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
};
