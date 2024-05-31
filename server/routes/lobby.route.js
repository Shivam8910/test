import express from "express";

import {
  getLobbies,
  createLobby,
  addUserToLobby,
  deleteUserFromLobby,
  getLobby,
} from "../controller/lobby.controller.js";
const router = express.Router();

router.get("/", getLobbies);
router.get("/:lobbyId", getLobby);
router.post("/", createLobby);

//update a lobby
router.put("/addUser", addUserToLobby);
router.put("/delUser", deleteUserFromLobby);

export default router;
