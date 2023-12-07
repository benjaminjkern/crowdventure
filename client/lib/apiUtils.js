import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// THESE NEED TO BE HIDDEN BETTER
// const backendURL =
//     "https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql";

const backendURL = "http://localhost:4000/";

const DEBUG_CALLS = false;

export const graphqlClient = new ApolloClient({
    uri: backendURL,
    cache: new InMemoryCache(),
});

const guessType = (variableValue) => {
    switch (typeof variableValue) {
        case "boolean":
            return "Boolean!";
        case "number":
            if (variableValue % 1 === 0) return "Int!";
            return "Float!";
        case "string":
            return "String!";
    }
    throw new Error(
        `Could not find a good variable match for ${variableValue}`
    );
};

const formatVariables = (variables) => {
    const varNames = Object.keys(variables);
    if (varNames.length === 0) return "";
    return `(${varNames
        .map((variable) => `$${variable}:${guessType(variables[variable])}`)
        .join(",")})`;
};

const formatArguments = (variables) => {
    const varNames = Object.keys(variables);
    if (varNames.length === 0) return "";
    return `(${varNames
        .map((variable) => `${variable}:$${variable}`)
        .join(",")})`;
};

const formatParameters = (parameters, tab = 2) => {
    const paramNames = Object.keys(parameters);
    if (paramNames.length === 0) return "";
    return `{
${paramNames
    .map((param) => {
        const tabs = Array(tab * 4)
            .fill(" ")
            .join("");

        if (typeof parameters[param] === "object")
            return `${tabs}${param} ${formatParameters(
                parameters[param],
                tab + 1
            )}`;
        return `${tabs}${param}`;
    })
    .join("\n")}
${Array((tab - 1) * 4)
    .fill(" ")
    .join("")}}`;
};

const scrubVariables = (variables) =>
    Object.keys(variables).reduce((p, varName) => {
        if (variables[varName] === undefined) return p;
        return { ...p, [varName]: variables[varName] };
    }, {});

const gqlCall = (gqlType, callName, parameters = {}, variables = {}) => {
    const useVariables = scrubVariables(variables);
    const call = `${gqlType}${formatVariables(useVariables)} {
    ${callName}${formatArguments(useVariables)}${formatParameters(parameters)}
}`;
    if (DEBUG_CALLS) console.log(call, variables);

    // This is just cuz graphql is dumb and likes to have a bunch of redundent call names
    const gqlClientCallName = gqlType === "mutation" ? "mutate" : gqlType;

    return graphqlClient[gqlClientCallName]({
        [gqlType]: gql`
            ${call}
        `,
        variables: useVariables,
        fetchPolicy: "network-only",
    })
        .then(({ data, error }) => {
            if (error) throw error;
            return data[callName];
        })
        .catch((err) => {
            console.error(err.networkError.result);
            throw err;
        });
};

export const queryCall = (callName, parameters, variables) =>
    gqlCall("query", callName, parameters, variables);
export const mutationCall = (callName, parameters, variables) =>
    gqlCall("mutation", callName, parameters, variables);
