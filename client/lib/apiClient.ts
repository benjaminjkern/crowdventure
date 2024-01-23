// example frontend, simple implementation based on fetch()
import { ExpressZodAPIClient } from "./clientDefs";

export default new ExpressZodAPIClient(async (method, path, params) => {
    const hasBody = !["get", "delete"].includes(method);
    const searchParams = hasBody ? "" : `?${new URLSearchParams(params)}`;
    let headers;

    const authToken = process.browser && localStorage.getItem("authToken");
    if (authToken) headers = { Authorization: `Bearer ${authToken}` };
    const response = await fetch(
        `https://crowdventure-backend-f3a189dfad64.herokuapp.com${path}${searchParams}`,
        {
            method: method.toUpperCase(),
            headers: hasBody
                ? { ...headers, "Content-Type": "application/json" }
                : headers,
            body: hasBody ? JSON.stringify(params) : undefined,
        }
    );

    const newAuthToken = response.headers.get("authToken");
    if (process.browser && newAuthToken)
        localStorage.setItem("authToken", newAuthToken);
    return response.json();
});
