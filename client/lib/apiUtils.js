import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// THESE NEED TO BE HIDDEN BETTER
const backendURL =
    "https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql";

// const BING_API_KEY = "8300cebe5f0d452a9ccb4bca67af4659";

export const graphqlClient = new ApolloClient({
    uri: backendURL,
    cache: new InMemoryCache(),
});
export const queryCall = async (callName, parameters = {}, variables = {}) => {
    const useVariables = scrubVariables(variables);
    console.log(`
    query${formatVariables(useVariables)} {
        ${callName}${formatArguments(useVariables)} {
            ${formatParameters(parameters)}
        }
    }
`);
    return graphqlClient
        .query({
            query: gql`
                query${formatVariables(useVariables)} {
                    ${callName}${formatArguments(useVariables)} {
                        ${formatParameters(parameters)}
                    }
                }
            `,
            variables: useVariables,
        })
        .then(({ data, error }) => {
            if (error) throw error;
            return data[callName];
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

export const mutationCall = async (callName, parameters, variables) => {
    const useVariables = scrubVariables(variables);
    return graphqlClient
        .mutate({
            mutation: gql`
                mutation${formatVariables(useVariables)} {
                    ${callName}${formatArguments(useVariables)} {
                        ${formatParameters(parameters)}
                    }
                }
            `,
            variables: useVariables,
        })
        .then(({ data, error }) => {
            if (error) throw error;
            return data[callName];
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
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

const formatParameters = (parameters) => {
    const paramNames = Object.keys(parameters);
    if (paramNames.length === 0) return "";
    return paramNames
        .map((param) => {
            if (typeof parameters[param] === "object")
                return `${param}{${formatParameters(parameters[param])}}`;
            return param;
        })
        .join(",");
};

const scrubVariables = (variables) => {
    return Object.keys(variables).reduce((p, varName) => {
        if (variables[varName] === undefined) return p;
        return { ...p, [varName]: variables[varName] };
    }, {});
};

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
    throw `Could not find a good variable match for ${variableValue}`;
};
