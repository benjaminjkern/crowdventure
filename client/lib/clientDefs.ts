type GetAccountGetAccountInput = {
    screenName: string;
};

type GetAccountGetAccountResponse = {
    status: "success";
    data: {
        account: {
            id: number;
            screenName: string;
            createdAt: any;
            updatedAt: any;
            isAdmin: boolean;
            hidden: boolean;
            profilePicURL: string | null;
            profilePicUnsafe: boolean;
            bio: string | null;
            totalNodeViews: number;
            totalSuggestionScore: number;
        } | null;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostAccountLoginInput = {} & {
    screenName: string;
    password?: string | undefined;
};

type PostAccountLoginResponse = {
    status: "success";
    data: {
        id: number;
        screenName: string;
        createdAt: any;
        updatedAt: any;
        isAdmin: boolean;
        hidden: boolean;
        profilePicURL: string | null;
        profilePicUnsafe: boolean;
        bio: string | null;
        totalNodeViews: number;
        totalSuggestionScore: number;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostAccountCreateAccountInput = {} & {
    screenName: string;
    password: string;
};

type PostAccountCreateAccountResponse = {
    status: "success";
    data: {
        id: number;
        screenName: string;
        createdAt: any;
        updatedAt: any;
        isAdmin: boolean;
        hidden: boolean;
        profilePicURL: string | null;
        profilePicUnsafe: boolean;
        bio: string | null;
        totalNodeViews: number;
        totalSuggestionScore: number;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PatchAccountEditAccountInput = {} & {
    id: number;
    screenName?: string | undefined;
    oldPassword?: string | undefined;
    newPassword?: string | undefined;
    bio?: (string | null) | undefined;
    profilePicURL?: (string | null) | undefined;
    hidden?: boolean | undefined;
    isAdmin?: boolean | undefined;
};

type PatchAccountEditAccountResponse = {
    status: "success";
    data: {
        id: number;
        screenName: string;
        createdAt: any;
        updatedAt: any;
        isAdmin: boolean;
        hidden: boolean;
        profilePicURL: string | null;
        profilePicUnsafe: boolean;
        bio: string | null;
        totalNodeViews: number;
        totalSuggestionScore: number;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type DeleteAccountDeleteAccountInput = {} & {
    id: string;
};

type DeleteAccountDeleteAccountResponse = {
    status: "success";
    data: {
        deleted: boolean;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetChoiceGetChoicesForNodeInput = {
    fromNodeId: string;
};

type GetChoiceGetChoicesForNodeResponse = {
    status: "success";
    data: {
        choices: {
            id: number;
            slug: string;
            action: string;
            createdAt: any;
            updatedAt: any;
            hidden: boolean;
            isCanon: boolean;
            score: number;
            fromNodeId: number;
            toNodeId: number | null;
            suggestedByAccountId: number | null;
            fromNode: {
                id: number;
                slug: string;
                title: string;
                content: string;
                createdAt: any;
                updatedAt: any;
                storedViews: number;
                featured: boolean;
                pictureURL: string | null;
                pictureUnsafe: boolean;
                hidden: boolean;
                views: number;
                ownerId: number | null;
                owner: {
                    id: number;
                    screenName: string;
                    createdAt: any;
                    updatedAt: any;
                    isAdmin: boolean;
                    hidden: boolean;
                    profilePicURL: string | null;
                    profilePicUnsafe: boolean;
                    bio: string | null;
                    totalNodeViews: number;
                    totalSuggestionScore: number;
                } | null;
            };
            suggestedBy: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
            toNode: {
                id: number;
                slug: string;
                title: string;
                content: string;
                createdAt: any;
                updatedAt: any;
                storedViews: number;
                featured: boolean;
                pictureURL: string | null;
                pictureUnsafe: boolean;
                hidden: boolean;
                views: number;
                ownerId: number | null;
                owner: {
                    id: number;
                    screenName: string;
                    createdAt: any;
                    updatedAt: any;
                    isAdmin: boolean;
                    hidden: boolean;
                    profilePicURL: string | null;
                    profilePicUnsafe: boolean;
                    bio: string | null;
                    totalNodeViews: number;
                    totalSuggestionScore: number;
                } | null;
            } | null;
        }[];
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostChoiceCreateChoiceInput = {} & {
    fromNodeId: number;
    toNodeId: number;
    action: string;
    hidden?: boolean | undefined;
};

type PostChoiceCreateChoiceResponse = {
    status: "success";
    data: {
        id: number;
        slug: string;
        action: string;
        createdAt: any;
        updatedAt: any;
        hidden: boolean;
        isCanon: boolean;
        score: number;
        fromNodeId: number;
        toNodeId: number | null;
        suggestedByAccountId: number | null;
        fromNode: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        };
        suggestedBy: {
            id: number;
            screenName: string;
            createdAt: any;
            updatedAt: any;
            isAdmin: boolean;
            hidden: boolean;
            profilePicURL: string | null;
            profilePicUnsafe: boolean;
            bio: string | null;
            totalNodeViews: number;
            totalSuggestionScore: number;
        } | null;
        toNode: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        } | null;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PatchChoiceEditChoiceInput = {} & {
    id: number;
    hidden?: boolean | undefined;
    toNodeId?: number | undefined;
    isCanon?: boolean | undefined;
    action?: string | undefined;
};

type PatchChoiceEditChoiceResponse = {
    status: "success";
    data: {
        id: number;
        slug: string;
        action: string;
        createdAt: any;
        updatedAt: any;
        hidden: boolean;
        isCanon: boolean;
        score: number;
        fromNodeId: number;
        toNodeId: number | null;
        suggestedByAccountId: number | null;
        fromNode: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        };
        suggestedBy: {
            id: number;
            screenName: string;
            createdAt: any;
            updatedAt: any;
            isAdmin: boolean;
            hidden: boolean;
            profilePicURL: string | null;
            profilePicUnsafe: boolean;
            bio: string | null;
            totalNodeViews: number;
            totalSuggestionScore: number;
        } | null;
        toNode: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        } | null;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type DeleteChoiceDeleteChoiceInput = {} & {
    id: string;
};

type DeleteChoiceDeleteChoiceResponse = {
    status: "success";
    data: {
        deleted: boolean;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetNodeFeaturedNodesInput = {
    allowHidden?: string | undefined;
    count?: string | undefined;
    ownedByAccount?: string | undefined;
};

type GetNodeFeaturedNodesResponse = {
    status: "success";
    data: {
        nodes: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        }[];
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetNodeGetNodeInput = {
    slug: string;
};

type GetNodeGetNodeResponse = {
    status: "success";
    data: {
        node: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        } | null;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostNodeCreateNodeInput = {} & {
    title: string;
    content: string;
    pictureURL?: string | undefined;
    featured?: boolean | undefined;
};

type PostNodeCreateNodeResponse = {
    status: "success";
    data: {
        id: number;
        slug: string;
        title: string;
        content: string;
        createdAt: any;
        updatedAt: any;
        storedViews: number;
        featured: boolean;
        pictureURL: string | null;
        pictureUnsafe: boolean;
        hidden: boolean;
        views: number;
        ownerId: number | null;
        owner: {
            id: number;
            screenName: string;
            createdAt: any;
            updatedAt: any;
            isAdmin: boolean;
            hidden: boolean;
            profilePicURL: string | null;
            profilePicUnsafe: boolean;
            bio: string | null;
            totalNodeViews: number;
            totalSuggestionScore: number;
        } | null;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PatchNodeEditNodeInput = {} & {
    id: number;
    title?: string | undefined;
    content?: string | undefined;
    pictureURL?: (string | null) | undefined;
    pictureUnsafe?: boolean | undefined;
    hidden?: boolean | undefined;
    featured?: boolean | undefined;
};

type PatchNodeEditNodeResponse = {
    status: "success";
    data: {
        id: number;
        slug: string;
        title: string;
        content: string;
        createdAt: any;
        updatedAt: any;
        storedViews: number;
        featured: boolean;
        pictureURL: string | null;
        pictureUnsafe: boolean;
        hidden: boolean;
        views: number;
        ownerId: number | null;
        owner: {
            id: number;
            screenName: string;
            createdAt: any;
            updatedAt: any;
            isAdmin: boolean;
            hidden: boolean;
            profilePicURL: string | null;
            profilePicUnsafe: boolean;
            bio: string | null;
            totalNodeViews: number;
            totalSuggestionScore: number;
        } | null;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type DeleteNodeDeleteNodeInput = {} & {
    id: string;
};

type DeleteNodeDeleteNodeResponse = {
    status: "success";
    data: {
        deleted: boolean;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetNodeSearchNodesInput = {
    query: string;
};

type GetNodeSearchNodesResponse = {
    status: "success";
    data: {
        nodes: {
            id: number;
            slug: string;
            title: string;
            content: string;
            createdAt: any;
            updatedAt: any;
            storedViews: number;
            featured: boolean;
            pictureURL: string | null;
            pictureUnsafe: boolean;
            hidden: boolean;
            views: number;
            ownerId: number | null;
            owner: {
                id: number;
                screenName: string;
                createdAt: any;
                updatedAt: any;
                isAdmin: boolean;
                hidden: boolean;
                profilePicURL: string | null;
                profilePicUnsafe: boolean;
                bio: string | null;
                totalNodeViews: number;
                totalSuggestionScore: number;
            } | null;
        }[];
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

export type Path = "/account/getAccount" | "/account/login" | "/account/createAccount" | "/account/editAccount" | "/account/deleteAccount" | "/choice/getChoicesForNode" | "/choice/createChoice" | "/choice/editChoice" | "/choice/deleteChoice" | "/node/featuredNodes" | "/node/getNode" | "/node/createNode" | "/node/editNode" | "/node/deleteNode" | "/node/searchNodes";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "get /account/getAccount": GetAccountGetAccountInput;
    "post /account/login": PostAccountLoginInput;
    "post /account/createAccount": PostAccountCreateAccountInput;
    "patch /account/editAccount": PatchAccountEditAccountInput;
    "delete /account/deleteAccount": DeleteAccountDeleteAccountInput;
    "get /choice/getChoicesForNode": GetChoiceGetChoicesForNodeInput;
    "post /choice/createChoice": PostChoiceCreateChoiceInput;
    "patch /choice/editChoice": PatchChoiceEditChoiceInput;
    "delete /choice/deleteChoice": DeleteChoiceDeleteChoiceInput;
    "get /node/featuredNodes": GetNodeFeaturedNodesInput;
    "get /node/getNode": GetNodeGetNodeInput;
    "post /node/createNode": PostNodeCreateNodeInput;
    "patch /node/editNode": PatchNodeEditNodeInput;
    "delete /node/deleteNode": DeleteNodeDeleteNodeInput;
    "get /node/searchNodes": GetNodeSearchNodesInput;
}

export interface Response extends Record<MethodPath, any> {
    "get /account/getAccount": GetAccountGetAccountResponse;
    "post /account/login": PostAccountLoginResponse;
    "post /account/createAccount": PostAccountCreateAccountResponse;
    "patch /account/editAccount": PatchAccountEditAccountResponse;
    "delete /account/deleteAccount": DeleteAccountDeleteAccountResponse;
    "get /choice/getChoicesForNode": GetChoiceGetChoicesForNodeResponse;
    "post /choice/createChoice": PostChoiceCreateChoiceResponse;
    "patch /choice/editChoice": PatchChoiceEditChoiceResponse;
    "delete /choice/deleteChoice": DeleteChoiceDeleteChoiceResponse;
    "get /node/featuredNodes": GetNodeFeaturedNodesResponse;
    "get /node/getNode": GetNodeGetNodeResponse;
    "post /node/createNode": PostNodeCreateNodeResponse;
    "patch /node/editNode": PatchNodeEditNodeResponse;
    "delete /node/deleteNode": DeleteNodeDeleteNodeResponse;
    "get /node/searchNodes": GetNodeSearchNodesResponse;
}

export const jsonEndpoints = { "get /account/getAccount": true, "post /account/login": true, "post /account/createAccount": true, "patch /account/editAccount": true, "delete /account/deleteAccount": true, "get /choice/getChoicesForNode": true, "post /choice/createChoice": true, "patch /choice/editChoice": true, "delete /choice/deleteChoice": true, "get /node/featuredNodes": true, "get /node/getNode": true, "post /node/createNode": true, "patch /node/editNode": true, "delete /node/deleteNode": true, "get /node/searchNodes": true };

export const endpointTags = { "get /account/getAccount": [], "post /account/login": [], "post /account/createAccount": [], "patch /account/editAccount": [], "delete /account/deleteAccount": [], "get /choice/getChoicesForNode": [], "post /choice/createChoice": [], "patch /choice/editChoice": [], "delete /choice/deleteChoice": [], "get /node/featuredNodes": [], "get /node/getNode": [], "post /node/createNode": [], "patch /node/editNode": [], "delete /node/deleteNode": [], "get /node/searchNodes": [] };

export type Provider = <M extends Method, P extends Path>(method: M, path: P, params: Input[`${M} ${P}`]) => Promise<Response[`${M} ${P}`]>;

export type Implementation = (method: Method, path: string, params: Record<string, any>) => Promise<any>;

/*
export const exampleImplementation: Implementation = async (
  method,
  path,
  params
) => {
  const hasBody = !["get", "delete"].includes(method);
  const searchParams = hasBody ? "" : `?${new URLSearchParams(params)}`;
  const response = await fetch(`https://example.com${path}${searchParams}`, {
    method: method.toUpperCase(),
    headers: hasBody ? { "Content-Type": "application/json" } : undefined,
    body: hasBody ? JSON.stringify(params) : undefined,
  });
  if (`${method} ${path}` in jsonEndpoints) {
    return response.json();
  }
  return response.text();
};

const client = new ExpressZodAPIClient(exampleImplementation);
client.provide("get", "/v1/user/retrieve", { id: "10" });
*/
export class ExpressZodAPIClient {
    constructor(protected readonly implementation: Implementation) { }
    public readonly provide: Provider = async (method, path, params) => this.implementation(method, Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path), Object.keys(params).reduce((acc, key) => path.indexOf(`:${key}`) >= 0 ? acc : { ...acc, [key]: params[key] }, {}));
}