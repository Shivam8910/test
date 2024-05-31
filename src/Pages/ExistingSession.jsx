import { Paper, Typography } from "@mui/material";
import Appbar from "../Components/Appbar";
import Session from "../Components/Session";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import AccountProvider from "../context/AccountProvider";
import { getLobbies } from "../service/lobbyApi.js";
import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "../context/CurrentUserContext";
function ExistingSession() {
  const { isAuthenticated } = useAuth0();
  const [lobbies, setLobbies] = useState([]);
  const { currentUser, loading } = useContext(CurrentUserContext);
  useEffect(() => {
    const fetchLobbies = async () => {
      const data = await getLobbies();
      setLobbies(data);
    };
    fetchLobbies();

    const interval = setInterval(fetchLobbies, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const theme = useTheme();

  const StyledPaper = styled(Paper)(() => ({
    width: "66rem",
    height: "28rem",
    backgroundColor: theme.palette.bg.main,
    boxShadow: 0,
    borderRadius: "30px",
    position: "relative",
    top: "10rem",
    margin: "auto",
    padding: "2rem",
    display: "grid",
    gridTemplateColumns: "32rem 32rem",
    gap: "2rem 0rem ",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }));

  const NoMeeting = styled(Paper)(() => ({
    width: "66rem",
    height: "28rem",
    backgroundColor: theme.palette.bg.main,
    boxShadow: 0,
    borderRadius: "30px",
    position: "relative",
    top: "10rem",
    margin: "auto",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !currentUser) {
    return <div>No user data available</div>;
  }

  if (lobbies.length === 0) {
    return (
      <div>
        <AccountProvider>
          <Appbar />
        </AccountProvider>

        <NoMeeting>
          <Typography
            sx={{
              marginY: "1rem",
              fontFamily: "Montserrat",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "18px",
              /* or 83% */
              letteSpacing: "0.05em",
              textAlign: "center",
            }}
          >
            Oops no Meetings for now 🥲😢
          </Typography>
        </NoMeeting>
      </div>
    );
  }

  return (
    <div>
      <AccountProvider>
        <Appbar />
      </AccountProvider>

      <StyledPaper>
        {lobbies.map((lobby) => {
          let isUserPresent = false;
          for (let i = 0; i < lobby.users.length; i++) {
            console.log(lobby.users[i].email + "," + currentUser.email);
            if (lobby.users[i].email === currentUser.email) {
              isUserPresent = true;
              break;
            }
          }

          return (
            <Session
              key={lobby.lobbyId}
              lobby={lobby}
              isUserPresent={isUserPresent}
            />
          );
        })}
      </StyledPaper>
    </div>
  );
}

export default ExistingSession;
