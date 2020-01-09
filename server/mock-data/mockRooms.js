const MOCK_ROOMS = {
  ABCD: {
    roomID: "ABCD",
    name: "Cool Room",
    users: [
      {
        userID: "123456789",
        queue: [
          {
            provider: "Spotify",
            providerID: "4n7jnSxVLd8QioibtTDBDq",
            name: "On My Way",
            artists: ["Alan Walker", "Sabrina Carpenter", "Farruko"],
            album: "On My Way - Single",
            cover:
              "https://upload.wikimedia.org/wikipedia/en/a/af/Alan_Walker_-_On_My_Way.png",
            addedBy: {
              userID: "123456789",
              firstName: "Donovan",
              lastName: "Moini",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874057631,
          },
        ],
      },
      {
        userID: "193759372",
        queue: [
          {
            provider: "YouTube",
            providerID: "qolmz4FlnZ0",
            name: "Doin' Time",
            artists: ["Lana Del Rey"],
            album: "Norman Fucking Rockwell!",
            cover: "https://img.youtube.com/vi/qolmz4FlnZ0/mqdefault.jpg",
            addedBy: {
              userID: "193759372",
              firstName: "Ian",
              lastName: "Lizarda",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874057639,
          },
          {
            provider: "YouTube",
            providerID: "6-OvO8ZuW98",
            name: "Liar",
            artists: ["Camila Cabello"],
            album: "Liar - Single",
            cover: "https://img.youtube.com/vi/6-OvO8ZuW98/mqdefault.jpg",
            addedBy: {
              userID: "193759372",
              firstName: "Ian",
              lastName: "Lizarda",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874057700,
          },
          {
            provider: "YouTube",
            providerID: "tvTRZJ-4EyI",
            name: "Humble",
            artists: ["Kendrick Lamar"],
            album: "DAMN.",
            cover: "https://img.youtube.com/vi/tvTRZJ-4EyI/mqdefault.jpg",
            addedBy: {
              userID: "193759372",
              firstName: "Ian",
              lastName: "Lizarda",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874057600,
          },
          {
            provider: "Spotify",
            providerID: "4uTvPEr01pjTbZgl7jcKBD",
            name: "NASA",
            artists: ["Ariana Grande"],
            album: "thank u, next",
            cover:
              "https://merrygoroundmagazine.com/wp-content/uploads/2019/03/Thank-U-Next.jpg",
            addedBy: {
              userID: "193759372",
              firstName: "Ian",
              lastName: "Lizarda",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874020000,
          },
        ],
      },
      {
        userID: "987654321",
        queue: [
          {
            provider: "Spotify",
            providerID: "39LmTF9RgyakzSYX8txrow",
            name: "imagine",
            artists: ["Ariana Grande"],
            album: "thank u, next",
            cover:
              "https://merrygoroundmagazine.com/wp-content/uploads/2019/03/Thank-U-Next.jpg",
            addedBy: {
              userID: "987654321",
              firstName: "Masao",
              lastName: "Kitamura",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874057661,
          },
          {
            provider: "Spotify",
            providerID: "1TEL6MlSSVLSdhOSddidlJ",
            name: "needy",
            artists: ["Ariana Grande"],
            album: "thank u, next",
            cover:
              "https://merrygoroundmagazine.com/wp-content/uploads/2019/03/Thank-U-Next.jpg",
            addedBy: {
              userID: "987654321",
              firstName: "Masao",
              lastName: "Kitamura",
              currentRoom: "ABCD",
            },
            timeAdded: 1571874057669,
          },
        ],
      },
    ],
  },
  "9AF4": {
    roomID: "9AF4",
    name: "Cooler Room",
    users: [
      {
        userID: "723749576",
        queue: [
          {
            provider: "Spotify",
            providerID: "4kV4N9D1iKVxx1KLvtTpjS",
            name: "Break Up With Your Girlfriend",
            artists: ["Ariana Grande"],
            album: "thank u, next",
            cover:
              "https://merrygoroundmagazine.com/wp-content/uploads/2019/03/Thank-U-Next.jpg",
            addedBy: {
              userID: "723749576",
              firstName: "Serena",
              lastName: "Zafiris",
              currentRoom: "9AF4",
            },
            timeAdded: 1571874057731,
          },
        ],
      },
    ],
  },
  "1234": {
    roomID: "1234",
    name: "The Best Room Everrrr",
    users: [
      {
        userID: "927493827",
        queue: [
          {
            provider: "Spotify",
            providerID: "2Fxmhks0bxGSBdJ92vM42m",
            name: "bad guy",
            artists: ["Billie Eilish"],
            album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
            cover:
              "https://consequenceofsound.net/wp-content/uploads/2019/03/when-we-all-fall-asleep-new-album-release-stream-billie.jpg",
            addedBy: {
              userID: "927493827",
              firstName: "Alexia",
              lastName: "Filler",
              currentRoom: "1234",
            },
            timeAdded: 1571874057634,
          },
          {
            provider: "YouTube",
            providerID: "qolmz4FlnZ0",
            name: "Doin' Time",
            artists: ["Lana Del Rey"],
            album: "Norman Fucking Rockwell!",
            cover: "https://img.youtube.com/vi/qolmz4FlnZ0/mqdefault.jpg",
            addedBy: {
              userID: "927493827",
              firstName: "Alexia",
              lastName: "Filler",
              currentRoom: "1234",
            },
            timeAdded: 1571874057631,
          },
        ],
      },
    ],
  },
};

module.exports = { MOCK_ROOMS };
