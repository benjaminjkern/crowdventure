// example frontend, simple implementation based on fetch()
import { ExpressZodAPIClient } from "./clientDefs";

export default new ExpressZodAPIClient(async (method, path, params) => {
    const hasBody = !["get", "delete"].includes(method);
    const searchParams = hasBody ? "" : `?${new URLSearchParams(params)}`;
    const response = await fetch(`https://example.com${path}${searchParams}`, {
        method: method.toUpperCase(),
        headers: hasBody ? { "Content-Type": "application/json" } : undefined,
        body: hasBody ? JSON.stringify(params) : undefined,
    });
    return response.json();
});
