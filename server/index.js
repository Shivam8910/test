import express from 'express';
import Connection from './database/db.js';
import route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import lobbyRoute from "./routes/lobby.route.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Workaround to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8000;

// Apply CORS middleware before defining routes
app.use(cors()); // Allow requests from all origins

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Define your routes
app.use('/', route);
app.use("/api/lobbies", lobbyRoute);

app.get("/", (req, res) => {
    //server has sent the response
    res.send("Hello form Node API Server");
  });
  
// Connect to the database
Connection();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`);
});


