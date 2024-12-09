import type { CollectionConfig } from "..";

export interface GetCollectionConfigUC {
    GetCollectionConfig: (collectionName: string) => Promise<CollectionConfig>;
}
