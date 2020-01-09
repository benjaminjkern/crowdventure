const { ApolloServer, gql, UserInputError } = require(require("./server.js")
  .serverType);
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
require("dotenv").config();
const searchYT = require("youtube-api-v3-search");
const SpotifyWebApi = require("spotify-web-api-node");

const ROOM_TABLE = "Rooms";
const USER_TABLE = "Users";

/*
 * Spotify Stuff
 */

const clientId = "60cd853053b042959d3712405d57220e", // this is okay to leave in because it's public
  clientSecret = process.env.SPOTIFY_PRIVATE_KEY;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

/*
 * Resolvers/endpoints for all GQL typeDefs
 */

const resolvers = {
  Room: {
    tracks: (parent, args, context, info) => {
      console.log(
        `Retrieving tracks in room ${parent.roomID} (${parent.name})`
      );

      // ROUND ROBIN CODE
      // WE TOOK IT OUT

      // let users = parent.users;
      // let largestQueueLength = Math.max.apply(
      //   null,
      //   users.map(user => user.queue.length)
      // );
      // let tracks = [];

      // for (let i = 0; i < largestQueueLength; i++) {
      //   users.forEach(user => {
      //     if (i < user.queue.length) {
      //       tracks.push(user.queue[i]);
      //     }
      //   });
      // }
      return parent.tracks;
    },
    owner: async (parent, args, context, info) => {
      console.log(`Retrieving owner of room ${parent.roomID} (${parent.name})`);
      return await getUserFromDB(parent.users[0]);
    }
  },
  Query: {
    // NOTE: Not to be used if the database becomes big
    users: async () => {
      console.log("Retrieving all users...");
      return await getTableFromDB(USER_TABLE);
    },
    // NOTE: Not to be used if the database becomes big
    rooms: async () => {
      console.log("Retrieving all rooms...");
      return await getTableFromDB(ROOM_TABLE);
    },
    getUser: async (parent, args, context, info) => {
      let user = await validateUserDoesExist(args);
      console.log(
        `Found user ${args.userID} (${user.firstName} ${user.lastName})`
      );
      return user;
    },
    getRoom: async (parent, args, context, info) => {
      let room = await validateRoomDoesExist(args);
      console.log(`Retrieving room ${room.roomID} (${room.name})`);
      return room;
    },
    getRoomUsers: async (parent, args, context, info) => {
      let room = await validateRoomDoesExist(args);
      console.log(`Retrieving users for room ${room.roomID} (${room.name})`);
      return Promise.all(room.users.map(userID => getUserFromDB(userID)));
    },
    getUserCurrentRoom: async (parent, args, context, info) => {
      let user = await validateUserInRoom(args);
      let room = await getRoomFromDB(user.currentRoom);
      console.log(
        `Got user ${args.userID} (${user.firstName} ${user.lastName}'s) current room (${room.roomID})`
      );
      return room;
    },
    searchYouTube: async (parent, args, context, info) => {
      if (!args.searchQuery) {
        throw new UserInputError("Search query is empty.", {
          invalidArgs: Object.keys(args)
        });
      }
      if (typeof args.maxResults === "number" && args.maxResults < 1) {
        throw new UserInputError(
          "Please input positive value for maxResults.",
          {
            invalidArgs: Object.keys(args)
          }
        );
      }

      const key = process.env.YOUTUBE_API_KEY;
      const options = {
        q: args.searchQuery,
        maxResults: !args.maxResults ? 5 : Math.min(args.maxResults, 20)
      };

      console.log(
        `Searching YouTube with query "${options.q}" and returning ${options.maxResults} result(s)`
      );

      return await searchYT(key, options)
        .then(data =>
          data.items.map(track => {
            return {
              provider: "YouTube",
              providerID: track.id.videoId,
              name: track.snippet.title,
              cover: track.snippet.thumbnails.medium.url,
              artists: [track.snippet.channelTitle],
              album: track.snippet.channelTitle
            };
          })
        )
        .catch(err => {
          console.log("Something went wrong when retrieving YouTube data", err);
        });
    },
    searchSpotify: async (parent, args, context, info) => {
      if (!args.searchQuery) {
        throw new UserInputError("Search query is empty.", {
          invalidArgs: Object.keys(args)
        });
      }
      if (typeof args.maxResults === "number" && args.maxResults < 1) {
        throw new UserInputError(
          "Please input positive value for maxResults.",
          {
            invalidArgs: Object.keys(args)
          }
        );
      }

      const options = {
        q: args.searchQuery,
        maxResults: !args.maxResults ? 5 : Math.min(args.maxResults, 20)
      };

      console.log(
        `Searching Spotify with query "${options.q}" and returning ${options.maxResults} result(s)`
      );

      await spotifyApi
        .clientCredentialsGrant()
        .then(data => {
          spotifyApi.setAccessToken(data.body["access_token"]);
        })
        .catch(err => {
          console.log(
            "Something went wrong when retrieving an access token",
            err
          );
        });

      return await spotifyApi
        .searchTracks(options.q, { limit: options.maxResults })
        .then(data =>
          data.body.tracks.items.map(track => {
            return {
              provider: "Spotify",
              providerID: track.id,
              name: track.name,
              artists: track.artists.map(artist => artist.name),
              cover: track.album.images[1].url,
              album: track.album.name
            };
          })
        )
        .catch(err => {
          console.log("Something went wrong when retrieving Spotify data", err);
        });
    }
  },
  Mutation: {
    addTrack: async (parent, args, context, info) => {
      let user = await validateUserDoesExist(args);
      let room = await validateUserInRoom(args);

      room.tracks.push({
        ...args.track,
        addedBy: user.userID,
        timeAdded: Date.now()
      });

      databaseUpdate(
        ROOM_TABLE,
        { roomID: room.roomID },
        "tracks",
        room.tracks
      );

      console.log(
        `User ${user.userID} (${user.firstName} ${user.lastName}) added a track in room ${room.roomID} (${room.name})`
      );
      return room.tracks;
    },
    deleteTrack: async (parent, args, context, info) => {
      let room = await validateRoomDoesExist(args);

      room.tracks.splice(args.index, 1);

      databaseUpdate(
        ROOM_TABLE,
        { roomID: room.roomID },
        "tracks",
        room.tracks
      );

      return room.tracks;
    },
    createUser: async (parent, args, context, info) => {
      await validateUserDoesNotExist(args);

      console.log(
        `Creating user ${args.userID} (${args.firstName} ${args.lastName})`
      );

      let user = {
        userID: args.userID,
        firstName: args.firstName,
        lastName: args.lastName
      };

      databasePut(USER_TABLE, user);

      return user;
    },
    createRoom: async (parent, args, context, info) => {
      let user = await validateUserNotInRoom(args);

      console.log(
        `Creating room with user ${args.userID} (${user.firstName} ${user.lastName})`
      );

      // Generate room ID
      let roomID;
      while (!roomID || (await getRoomFromDB(roomID)))
        roomID = Math.random()
          .toString(36)
          .slice(2, 6)
          .toUpperCase();

      room = {
        roomID: roomID,
        name: args.name,
        users: [user.userID],
        tracks: []
      };

      user.currentRoom = roomID;

      databasePut(USER_TABLE, user);
      databasePut(ROOM_TABLE, room);

      return room;
    },
    deleteRoom: async (parent, args, context, info) => {
      let room = await validateRoomDoesExist(args);
      console.log(`Deleting room ${args.roomID} (${room.name})`);

      let users = await resolvers.Query.getRoomUsers(undefined, {
        roomID: room.roomID
      });

      users.forEach(user => {
        delete user.currentRoom;
        databasePut(USER_TABLE, user);
      });
      databaseDelete(ROOM_TABLE, { roomID: room.roomID });

      return true;
    },
    joinRoom: async (parent, args, context, info) => {
      let user = await validateUserNotInRoom(args);
      let room = await validateRoomDoesExist(args);

      console.log(
        `User ${user.userID} (${user.firstName} ${user.lastName}) is joining room ${args.roomID} (${room.name})`
      );

      user.currentRoom = room.roomID;
      room.users.push(user.userID);

      databasePut(USER_TABLE, user);
      databasePut(ROOM_TABLE, room);

      return room;
    },
    leaveRoom: async (parent, args, context, info) => {
      let { user, room } = await validateUserInRoom(args);

      console.log(
        `User ${user.userID} (${user.firstName} ${user.lastName}) is leaving room ${room.roomID} (${room.name})`
      );

      let owner = await resolvers.Room.owner(room);

      console.log("OWNER");
      console.log(owner);

      if (owner.userID === user.userID) {
        console.log(
          `User ${user.userID} (${user.firstName} ${user.lastName}) is the owner of room ${room.roomID} (${room.name})`
        );
        resolvers.Mutation.deleteRoom(undefined, { roomID: room.roomID });
      } else {
        delete user.currentRoom;
        room.users = room.users.filter(u => u.userID !== args.userID);

        databasePut(USER_TABLE, user);
        databasePut(ROOM_TABLE, room);
      }

      return room;
    }
  }
};

/*
 * Database getter functions
 */

const getTableFromDB = async tableName => {
  const params = {
    TableName: tableName
  };
  let scanResults = [];
  let items;
  do {
    items = await docClient
      .scan(params)
      .promise()
      .catch(err => {
        console.log("error", err);
      });
    items.Items.forEach(item => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (items.LastEvaluatedKey);
  return scanResults;
};

const getUserFromDB = async userID => {
  console.log(`Getting user ${userID} from DB...`);

  const params = {
    TableName: USER_TABLE,
    Key: { userID: userID }
  };
  return await docClient
    .get(params)
    .promise()
    .then(data => data.Item)
    .catch(err => {
      console.log("error", err);
    });
};

const getRoomFromDB = async roomID => {
  console.log(`Getting room ${roomID} from DB...`);
  if (!roomID) return undefined;

  const params = {
    TableName: ROOM_TABLE,
    Key: { roomID: roomID }
  };
  return await docClient
    .get(params)
    .promise()
    .then(data => data.Item)
    .catch(err => {
      console.log("error", err);
    });
};

const databasePut = async (table, item) => {
  console.log(`Putting ${item} into ${table} table...`);
  const params = {
    TableName: table,
    Item: item
  };

  return await docClient
    .put(params)
    .promise()
    .then(data => data.Item)
    .catch(err => {
      console.log("error", err);
    });
};
const databaseDelete = async (table, key) => {
  console.log(`Deleting ${key} from ${table} table...`);
  const params = {
    TableName: table,
    Key: key
  };

  return await docClient
    .delete(params)
    .promise()
    .then(data => data.Item)
    .catch(err => {
      console.log("error", err);
    });
};

const databaseUpdate = async (table, key, element, value) => {
  console.log(
    `Updating ${element} to ${value} in ${key} item in ${table} table`
  );
  const params = {
    TableName: table,
    Key: key,
    UpdateExpression: `set ${element} = :f`,
    ExpressionAttributeValues: {
      ":f": value
    }
  };

  return await docClient
    .update(params)
    .promise()
    .then(data => data.Item)
    .catch(err => {
      console.log("error", err);
    });
};

/*
 * Error Checking Functions
 */

const validateUserDoesExist = async args => {
  let user = await getUserFromDB(args.userID);
  if (!user) {
    throw new UserInputError(`User ${args.userID} does not exist.`, {
      invalidArgs: Object.keys(args)
    });
  }
  return user;
};
const validateUserDoesNotExist = async args => {
  let user = await getUserFromDB(args.userID);
  if (user) {
    throw new UserInputError(
      `User ${user.userID} (${user.firstName} ${user.lastName}) already exists.`,
      {
        invalidArgs: Object.keys(args)
      }
    );
  }
};
const validateUserInRoom = async args => {
  let user = await validateUserDoesExist(args);
  if (!user.currentRoom) {
    throw new UserInputError(
      `User ${user.userID} (${user.firstName} ${user.lastName}) is not in a room`,
      {
        invalidArgs: Object.keys(args)
      }
    );
  }
  let room = await validateRoomDoesExist({ roomID: user.currentRoom });
  return { user, room };
};
const validateUserNotInRoom = async args => {
  let user = await validateUserDoesExist(args);
  if (user.currentRoom) {
    throw new UserInputError(
      `User ${user.userID} (${user.firstName} ${user.lastName}) is already in a room`,
      {
        invalidArgs: Object.keys(args)
      }
    );
  }
  return user;
};
const validateRoomDoesExist = async args => {
  let room = await getRoomFromDB(args.roomID);
  if (!room) {
    throw new UserInputError(`Room ${args.roomID} does not exist.`, {
      invalidArgs: Object.keys(args)
    });
  }
  return room;
};

module.exports = { resolvers };
