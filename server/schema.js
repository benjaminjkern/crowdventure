const { ApolloServer, gql, UserInputError } = require(require("./server.js")
  .serverType);

const typeDefs = gql`
  input TrackInput {
    provider: String!
    providerID: String!
    name: String!
    artists: [String!]!
    album: String!
    cover: String!
  }

  type Track {
    provider: String!
    providerID: String!
    name: String!
    artists: [String!]!
    album: String!
    cover: String!
    addedBy: String!
    timeAdded: Float!
  }

  type User {
    userID: String!
    firstName: String!
    lastName: String!
    currentRoom: String
  }

  type Room {
    roomID: String!
    name: String!
    users: [String!]!
    tracks: [Track!]!
    owner: User!
  }

  type SearchResult {
    provider: String!
    providerID: String!
    name: String!
    cover: String!
    artists: [String!]!
    album: String!
  }

  type Query {
    users: [User!]!
    rooms: [Room!]!
    getUser(userID: String!): User!
    getRoom(roomID: String!): Room!
    getRoomUsers(roomID: String!): [User!]!
    getUserCurrentRoom(userID: String!): Room!
    searchYouTube(searchQuery: String!, maxResults: Int): [SearchResult!]!
    searchSpotify(searchQuery: String!, maxResults: Int): [SearchResult!]!
  }

  type Mutation {
    addTrack(userID: String!, track: TrackInput!): [Track!]!
    deleteTrack(roomID: String!, index: Int): [Track!]!
    createUser(userID: String!, firstName: String!, lastName: String!): User!
    createRoom(userID: String!, name: String!): Room!
    deleteRoom(roomID: String!): Boolean
    joinRoom(userID: String!, roomID: String!): Room!
    leaveRoom(userID: String!): Room!
  }
`;

module.exports = { typeDefs };
