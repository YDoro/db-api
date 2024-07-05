import { ObjectId, type Document } from "mongodb";
import type { Request } from "../../presentation/interfaces/http";

type update = {
    collection: string,
    isSubDocumentUpdate: boolean,
    document: any,
    filter: Document,
    arrayFilters: any[]
}

export default (req: Request): update => {
    const { url, body, query } = req
    const [col, ...rest] = url.slice(1).split("/")
    const isSubDocumentUpdate = !!rest.filter(v => !ObjectId.isValid(v) && !!v).length
    const search: any = {}
    const filters: any[] = [];

    var updatePath = "";

    const queryFilter: any = {};
    query?.split("&").forEach((arg) => {
        const [param, value] = arg.split("=")
        queryFilter[`.${param}`] = value
    })

    const clearValues = rest.filter(v => v);
    clearValues.forEach((segment, i) => {
        if (ObjectId.isValid(segment)) {
            if (!search["_id"]) {
                search["_id"] = new ObjectId(segment)
                return
            } else {
                updatePath += `.$[element${i}]`
                filters.push({ [`element${i}._id`]: new ObjectId(segment) })
                return
            }
        }

        updatePath += `.${segment}`

        if (i === clearValues.length - 1 && Object.keys(queryFilter).length) {
            updatePath += `.$[element${i}]`
            const parsedQueryFilter: any = {}
            Object.entries(queryFilter).forEach(([key, value]) => {
                parsedQueryFilter[`element${i}${key}`] = value
            })

            filters.push(parsedQueryFilter)
        }
    })


    const finaldocument = {
        $set: updatePath ? { [updatePath.slice(1)]: body } : body
    }

    return { collection: col, document: finaldocument, isSubDocumentUpdate: isSubDocumentUpdate, filter: search, arrayFilters: filters }
}
