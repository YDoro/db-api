import { type Document, ObjectId } from "mongodb";
import type { Request } from "../../presentation/interfaces/http";

type update = {
    collection: string;
    isSubDocumentUpdate: boolean;
    document: any;
    filter: Document;
    arrayFilters: any[];
};

export default (req: Request): update => {
    const { url, body, query } = req;
    const [col, ...rest] = url.slice(1).split("/");
    const isSubDocumentUpdate = !!rest.filter((v) => !ObjectId.isValid(v) && !!v).length;
    const isSpecificDocUpdate = ObjectId.isValid(structuredClone(rest).pop() || "");
    const search: any = {};
    const filters: any[] = [];

    let updatePath = "";

    const queryFilter: any = {};

    for (const arg of query?.split("&") || []) {
        const [param, value] = arg.split("=");
        queryFilter[`.${param}`] = value;
    }

    const clearValues = rest.filter((v) => v);
    clearValues.forEach((segment, i) => {
        if (ObjectId.isValid(segment)) {
            if (!search._id) {
                search._id = new ObjectId(segment);
                return;
            }
            updatePath += `.$[element${i}]`;
            filters.push({ [`element${i}._id`]: new ObjectId(segment) });
            return;
        }

        updatePath += `.${segment}`;

        if (i === clearValues.length - 1 && Object.keys(queryFilter).length) {
            updatePath += `.$[element${i}]`;
            const parsedQueryFilter: any = {};

            for (const [key, value] of Object.entries(queryFilter)) {
                parsedQueryFilter[`element${i}${key}`] = value;
            }

            filters.push(parsedQueryFilter);
        }
    });

    const finaldocument = {
        $set: updatePath ? { [updatePath.slice(1)]: body } : body,
    };

    if (isSpecificDocUpdate && isSubDocumentUpdate) {
        for (const [key, doc] of Object.entries(finaldocument.$set)) {
            for (const [keyToUpdate, value] of Object.entries(doc as any)) {
                finaldocument.$set[`${key}.${keyToUpdate}`] = value;
            }
            delete finaldocument.$set[key];
        }
    }

    return {
        collection: col,
        document: finaldocument,
        isSubDocumentUpdate: isSubDocumentUpdate,
        filter: search,
        arrayFilters: filters,
    };
};
