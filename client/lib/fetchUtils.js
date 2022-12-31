export const apiURL = "http://localhost:8000/api/";

export const BUCKET_URL =
    "https://quick-queue-bucket.s3.us-west-1.amazonaws.com";

// Display all urls and responses
const DEBUG_CALLS = false;
const DEBUG_RESPONSES = false;

// Ensure that the endpoint is formatted correctly (Kinda done is a funny way but whatever)
// If this isnt done certain endpoints turn post to get requests, should probably fix on backend as well but this is the fix for now
const simplifyEndpoint = (endpoint) =>
    endpoint
        .split("/")
        .filter((a) => a)
        .join("/") + (endpoint.includes("?") ? "" : "/");

const makeUrl = (endpoint) => {
    const host = endpoint.split(/https?:\/\//g)[1];
    if (!host) return apiURL + simplifyEndpoint(endpoint);
    const apiHost = apiURL.split(/https?:\/\//g)[1];
    if (host.startsWith(apiHost))
        return apiURL + simplifyEndpoint(host.split(apiHost)[1]);
    return endpoint;
};

export const postRequest = async (...args) => authenticatedRequest(...args);

export const authenticatedRequest = async (
    endpoint,
    parameters = {},
    method = "POST",
    contentType = "application/json",
    useSessionCookie = true // honestly it should pretty much always just use a session cookie
) => {
    const url = makeUrl(endpoint);
    // const { sessionid, csrftoken } = await CookieManager.get(url);
    const { sessionid, csrftoken } = {};

    const cookieRequest = !csrftoken
        ? ""
        : "csrftoken=" +
          csrftoken.value +
          (useSessionCookie && sessionid
              ? "; sessionid=" + sessionid.value
              : "");

    let data;
    if (contentType.includes("multipart")) {
        data = parameters;
    } else {
        data = Object.keys(parameters).length
            ? JSON.stringify(parameters)
            : null;
    }

    return fetch(url, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": contentType,
            Referer: url,
            Cookie: cookieRequest,
            ...(csrftoken ? { "X-CSRFTOKEN": csrftoken.value } : {}),
        },
        body: data,
    })
        .then((response) => {
            if (DEBUG_CALLS) console.log(url, parameters);

            let map = response.headers.map;
            if (!map) {
                map =
                    response.headers[
                        Object.getOwnPropertySymbols(response.headers)[0]
                    ];
            }
            // Certain endpoints dont return any json and resort to empty plain text (Should be fixed on backend but this is a good backup fix)
            if (
                map["content-type"] === "application/json" ||
                map["content-type"].includes("application/json")
            )
                return response.json();

            if (
                map["content-type"] === "text/plain; charset=utf-8" ||
                map["content-type"].includes("text/plain; charset=utf-8")
            )
                return response.text();

            return response;
        })
        .then((parsedResponse) => {
            if (DEBUG_RESPONSES) console.log(parsedResponse);
            return parsedResponse;
        })
        .catch((err) => console.warn(url, "->", err));
};

const makeGetParameters = (parameters, endpoint) => {
    const newParameters = { ...parameters };

    const [beginEndpoint, existingParams] = endpoint.split("?");
    if (existingParams) {
        const paramsList = existingParams.split("&");
        paramsList.forEach((param) => {
            const [key, value] = param.split("=");
            newParameters[key] = value;
        });
    }

    const keys = Object.keys(newParameters);
    if (!keys.length) return makeUrl(beginEndpoint);
    return `${makeUrl(beginEndpoint)}?${keys
        .filter((key) => newParameters[key] !== undefined)
        .map((key) => `${key}=${newParameters[key]}`)
        .join("&")}`;
};

export const getRequest = async (endpoint, parameters = {}) => {
    const url = makeGetParameters(parameters, endpoint);
    return authenticatedRequest(url, {}, "GET");
};

export const imageUploadRequest = async (endpoint, parameters = {}) => {
    const data = new FormData();

    for (const key in parameters) {
        if (parameters[key] === null) return "No Image Attached";
        data.append(key, parameters[key]);
    }

    return authenticatedRequest(
        endpoint,
        data,
        "PATCH",
        "multipart/form-data; boundary=4754jffsd"
    );
};
