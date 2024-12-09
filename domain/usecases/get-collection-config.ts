import type { CollectionConfig } from "../entities/collection";

export interface GetCollectionConfigUC {
    GetCollectionConfig: (collectionName: string) => Promise<CollectionConfig>;
}
