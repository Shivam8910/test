import Lobby from "../model/lobby.model.js";

export const getLobbies = async (req, res) => {
  try {
    const lobbies = await Lobby.find({});
    res.status(200).json(lobbies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLobby = async (req, res) => {
  const { lobbyId } = req.params;
  try {
    const lobby = await Lobby.findOne({ lobbyId: lobbyId });
    res.status(200).json(lobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLobby = async (req, res) => {
  try {
    //create product in db
    const lobby = await Lobby.create(req.body);
    //success response when product is created
    res.status(200).json(lobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUserToLobby = async (req, res) => {
  try {
    const result = await Lobby.updateOne(
      { lobbyId: req.body.lobbyId }, // Filter criteria
      { $inc: { countUser: 1 }, $push: { users: req.body.user } } // Update operation
    );
    res.status(200).json(result);
    if (result) {
      console.log(`User added to lobby with lobbyId "${req.body.lobbyId}".`);
      console.log("Updated Lobby:", result);
    } else {
      console.log(`No lobby found with lobbyId "${req.body.lobbyId}".`);
    }
  } catch (error) {
    console.error("Error adding user to lobby:", error);
  }
};

export const deleteUserFromLobby = async (req, res) => {
  try {
    const lobby = await Lobby.findOne({ lobbyId: req.body.lobbyId });
    const { countUser } = lobby;

    //if user count <= 1 we have to delete the lobby
    if (countUser <= 1) {
      const lob = await Lobby.deleteOne({ lobbyId: req.body.lobbyId });
      if (!lob) {
        return res.status(404).json({ message: "Lobby not found" });
      }
      res.status(200).json({ message: "Lobby deleted successfully" });
    }
    // if user count > 1 we have to remove the user from lobby
    else {
      const result = await Lobby.updateOne(
        { lobbyId: req.body.lobbyId },
        {
          $inc: { countUser: -1 },
          $set: { hasMeetingStarted: req.body.hasMeetingStarted },
          $pull: { users: { email: req.body.email } },
        }
      );
      res.status(200).json(result);

      if (result) {
        console.log(
          `User ${req.body.email} deleted from lobby with lobbyId "${req.body.lobbyId}".`
        );
        console.log("Updated Lobby:", result);
      } else {
        console.log(`No lobby found with lobbyId "${req.body.lobbyId}".`);
      }
    }
  } catch (error) {
    console.error("Error deleting user to lobby:", error);
  }
};
