declare type APIRequest = import("express").Request & {
    payload: null //Auth0 id token
};

declare type APIResponse = import("express").Response;

interface Endpoint {
    method: "get" | "post" | "put" | "delete";
    path: string;
    admin?: boolean;
    handler(this: import("./src/server/index"), req: APIRequest, res: APIResponse): void;
}

declare type Experience = {
    title: string;
    date:  string;
    image: string;
    link?: string;
    blurb: string;
    info:  string[];
}

declare type Hobby = {
    title: string;
    image: string;
    link?: string;
    blurb: string;
    info:  string[];
}

declare type Project = {
    title: string;
    date:  string;
    image: string;
    link?: string;
    work:  string;
    blurb: string;
    info:  string[];
}

declare type collections = "hobbies" | "projects" | "experiences";