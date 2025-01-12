import { ObjectId } from "mongodb";
import type { DocumentQuery } from "../../domain/entities/document";
import type { Request } from "../../presentation/interfaces/http";

export const MongoRequestToDocumentQueryMapper = (req: Request): DocumentQuery => {
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
