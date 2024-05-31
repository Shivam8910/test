import mongoose from "mongoose";

const LobbySchema = mongoose.Schema(
  {
    lobbyId: {
      type: String,
      required: true,
    },
    topicHeader: {
      type: String,
      required: true,
    },

    topicName: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    countUser: {
      type: Number,
      default: 1,
    },

    hasMeetingStarted: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: "String",
          required: true,
        },
        picture: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timstamps: true }
);

const Lobby = mongoose.model("Lobby", LobbySchema);

export default Lobby;
