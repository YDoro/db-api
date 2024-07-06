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

    rest.filter((v) => v).forEach((segment) => {
        if (ObjectId.isValid(segment)) {
            if (!search._id) {
                search._id = new ObjectId(segment);
                return;
            }
            updatePath += ".$[element]";
            filters.push({ "element._id": new ObjectId(segment) });
            return;
        }

        updatePath += `.${segment}`;
    });

    query?.split("&").forEach((arg) => {
        const [param, value] = arg.split("=");
        search[`${param}`] = value;
    });

    const finaldocument = updatePath
        ? {
              $push: { [updatePath.slice(1)]: body },
          }
        : body;

    return { collection: col, document: finaldocument, isSubDocumentInsertion, filter: search, arrayFilters: filters };
};
