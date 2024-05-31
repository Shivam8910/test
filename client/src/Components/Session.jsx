import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToLobby } from "../service/lobbyApi";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext } from "react";
function Session({ lobby, isUserPresent }) {
  const theme = useTheme();
  const { currentUser, loading } = useContext(CurrentUserContext);
  const { isAuthenticated } = useAuth0();
  const StyledPaper = styled(Paper)(() => ({
    backgroundColor: theme.palette.gray.main,
    display: "flex",
    flexDirection: "column",
    width: "30rem",
    height: "13rem",
    marginLeft: "2rem",
    borderRadius: "25px",
  }));

  const StyledButton = styled(Button)(() => ({
    height: "2rem",
    borderRadius: "25px",
    margin: "0.7rem 2rem 0rem 2rem",
    backgroundColor: "#D6DBDF",
    color: "black",
    pointerEvents: "none",
  }));

  const ButtonText = styled(Typography)(() => ({
    fontFamily: "Montserrat",
    fontWeight: "700",
    textTransform: "initial",
  }));

  const AvatarBox = styled(Box)(() => ({
    width: "12rem",
    display: "flex",
    marginLeft: "1.7rem",
    alignItems: "center",
    paddingRight: "3rem",
  }));

  const CustomAvatar = styled(Avatar)(() => ({
    height: "2.5rem",
    width: "2.5rem",
    margin: "0.5rem",
    backgroundColor: theme.palette.sec.main,
  }));

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    const data = {
      lobbyId: lobby.lobbyId,
      user: {
        name: currentUser.name,
        email: currentUser.email,
        picture: currentUser.picture,
      },
    };

    const addUser = async () => {
      await addUserToLobby(data);
    };
    addUser();
    navigate(
      `/barcat/${lobby.language}/${lobby.topicHeader}/${lobby.topicName}/${lobby.lobbyId}`
    );
  }, [
    lobby.language,
    lobby.lobbyId,
    lobby.topicHeader,
    lobby.topicName,
    navigate,
    currentUser.email,
    currentUser.name,
    currentUser.picture,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !currentUser) {
    return <div>No user data available</div>;
  }

  return (
    <StyledPaper>
      <StyledButton variant="contained" disableRipple>
        <ButtonText>{lobby.topicHeader}</ButtonText>
      </StyledButton>
      <StyledButton variant="contained" disableRipple>
        <ButtonText>{lobby.topicName}</ButtonText>
      </StyledButton>
      <StyledButton variant="contained" disableRipple>
        <ButtonText>{lobby.language}</ButtonText>
      </StyledButton>

      <Box sx={{ display: "flex", marginTop: "1rem" }}>
        <AvatarBox>
          {lobby.users.map((currentUser) => {
            const { picture } = currentUser;
            return (
              <CustomAvatar key={currentUser.email} alt="user" src={picture} />
            );
          })}
        </AvatarBox>

        {lobby.countUser >= 4 || isUserPresent ? (
          <Button
            variant="contained"
            color="pri"
            sx={{
              backgroundColor: theme.palette.sec.main,
              color: "black",
              height: "2.5rem",
              width: "8rem",
              borderRadius: "12px",
              position: "relative",
              top: "0.5rem",
              left: "2.1rem",
            }}
            disableFocusRipple
            disableTouchRipple
            disableElevation
          >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                textTransform: "initial",
              }}
            >
              Can't Enter
            </Typography>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="pri"
            onClick={handleClick}
            sx={{
              color: "white",
              height: "2.5rem",
              width: "9rem",
              borderRadius: "12px",
              position: "relative",
              top: "0.5rem",
              left: "2.1rem",
            }}
          >
            <ButtonText>Join</ButtonText>
          </Button>
        )}
      </Box>
    </StyledPaper>
  );
}

export default Session;
