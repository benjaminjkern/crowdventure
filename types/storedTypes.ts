// TODO: Make the dateCreated and lastUpdated the same type

export type StoredAccount = {
    lastIP?: string; // TODO: Deprecated
    dateCreated: string;
    lastUpdated?: number; // TODO: Was never included before for some reason
    totalNodeViews: number;
    screenName: string;
    isAdmin: boolean;
    totalSuggestionScore: number;
    encryptedPassword: string; // Hide in real account
    profilePicURL?: null | string; // TODO: Should get rid of null
    bio?: null | string; // TODO: Should get rid of null
    hidden?: boolean; // TODO: Make this always available
};

export type StoredChoice = {
    action: string;
    dateCreated: string;
    lastUpdated?: number; // TODO: Was never included before for some reason
    from: string;
    score: number;
    suggestedBy: string;
    ID: string;
    to: string;
    isCanon: boolean;
    hidden?: boolean; // TODO: Should migrate this to be always available
};

export type StoredFeedback = {
    info: string;
    submittedBy?: string;
    dateCreated: string;
    reporting?: { type: "Node" | "Account" | "Choice"; ID: string }; // TODO: Make this not be an object (split into reportingType and reportingID)
    IP: string; // TODO: Remove this (?) Maybe not actually so I can still track anonymous feedback
    ID: string;
};

export type StoredNode = {
    content: string;
    dateCreated: string;
    lastUpdated: number;
    searchTitle: string; // TODO: I would like to not have to have this
    storedViews?: number; // TODO: Make this always available
    views: number;
    owner: string;
    ID: string;
    featured: boolean;
    title: string;
    pictureURL?: string;
    hidden?: boolean; // TODO: Make this always available
    pictureUnsafe?: boolean; // TODO: Make this always available (ALSO Change this to pictureSafe)
};

export type StoredNotification = {
    content: string;
    account: string;
    time: number;
    link?: string;
    ID: string;
    seen: boolean;
};

export type Reaction = {
    like: boolean;
    account: string;
    choice: string;
    ID: string;
};

// TODO: Get rid of this
export type StoredSortedNode = {
    lastUpdated: number;
    ID: string;
    idx: string;
    featured: boolean;
    hidden: boolean;
};

export type StoredView = {
    IP: string;
    node: string;
    ID: string;
};
