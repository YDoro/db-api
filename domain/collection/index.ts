/**
 * The privacy of a collection
 * - public: can be exposed to the api
 * - protected: can only be exposed to the api with authentication
 * - private: system usage only
 */
export type Privacy = "public" | "private" | "protected";
export type Operation = "read" | "create" | "update" | "delete";
export interface CollectionConfig {
    privacy: Privacy;
    allowedOperations: Operation[];
    allowedUsers?: string[]; // TODO - change for a trully auth
}

export interface Collection {
    name: string;
    config: CollectionConfig;
}
