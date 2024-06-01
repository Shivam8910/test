import { Box, Typography, styled, Button } from "@mui/material";
import Countdown from "react-countdown";
import NameSlide from "../Components/NameSlide";
import { useNavigate, useParams } from "react-router-dom";
import AccountProvider from "../context/AccountProvider";
import Appbar from "../Components/Appbar";
import { AccountContext } from "../context/AccountProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { deleteUserFromLobby } from "../service/lobbyApi";
import axios from "axios";
import { CurrentUserContext } from "../context/CurrentUserContext";

const url = "https://test-micmzxzzv-shivam8910s-projects.vercel.app";

const BackPart = styled(Box)`
  position: absolute;
  width: 1150px;
  height: 55px;
  left: 200px;
  top: 10.5rem;
  background: #c8d8f0;
  border-radius: 20px;
  display: flex;
`;

const FrontBox = styled(Box)`
  position: relative;
  margin: 0 0.3em auto;
  width: 250px;
  height: 40px;
  left: 10px;
  top: 7.5px;
  background: #747487;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Timer = styled(Box)`
  position: relative;
  margin: 0 0.3rem auto;
  width: 200px;
  height: 40px;
  left: 13.5rem;
  top: 7.5px;
  background: #747487;
  border-radius: 50px;
`;

const Text = styled(Typography)`
  position: relative;
  width: 280px;
  height: 51px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 18px;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimerText = styled(Typography)`
  margin: 0 auto;
  position: relative;
  padding-left: 4.5rem;
  padding-top: 0.6rem;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 18px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const Start = styled(Button)`
  position: absolute;
  width: 12rem;
  height: 3rem;
  left: 20rem;
  top: 32.5rem;
  border-radius: 50px;
`;

const End = styled(Button)`
  position: absolute;
  width: 12rem;
  height: 3rem;
  right: 23rem;
  top: 32.5rem;
  border-radius: 50px;
`;

const renderer = ({ minutes, seconds }) => (
  <span>
    0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </span>
);

function BarCat() {
  const { language, topicHeader, topic, lobbyId } = useParams();
  const account = useContext(AccountContext);
  const { currentUser, loading } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [lobby, setLobby] = useState({});

  useEffect(() => {
    const getLobby = async () => {
      try {
        const response = await axios.get(`${url}/api/lobbies/${lobbyId}`);
        setLobby(response.data);
      } catch (error) {
        console.log("error while calling getLobbies api", error.message);
      }
    };
    getLobby();

    const interval = setInterval(getLobby, 3000); // Poll every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [lobbyId]);

  const handleEndNow = useCallback(() => {
    const data = {
      lobbyId: lobbyId,
      email: currentUser.email,
      hasMeetingStarted: false,
    };

    const pullUser = async () => {
      await deleteUserFromLobby(data);
    };
    pullUser();

    navigate("/existsession");
  }, [lobbyId, navigate, currentUser]);

  const handleJoinRoom = useCallback(() => {
    const data = {
      lobbyId: lobbyId,
      email: currentUser.email,
      hasMeetingStarted: true,
    };

    const pullUser = async () => {
      await deleteUserFromLobby(data);
    };
    pullUser();

    navigate(`/room/${language}/${topicHeader}/${topic}/${lobbyId}`);
  }, [language, lobbyId, navigate, topic, topicHeader, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (lobby?.hasMeetingStarted === true) {
    return (
      <>
        <AccountProvider>
          <Appbar account={account} />
        </AccountProvider>
        <Box
          sx={{
            position: "relative",
            top: "7rem",
            marginLeft: "27rem",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EEAF8B",
            width: "40rem",
            height: "2rem",
          }}
        >
          <Typography>
            Meeting has started 🙋‍♂️!!, please entered before timer ends 🙏
          </Typography>
        </Box>

        <BackPart>
          <FrontBox>
            <Text>{topicHeader}</Text>
          </FrontBox>
          <FrontBox sx={{ width: "450px" }}>
            <Text sx={{ width: "400px" }}>{topic}</Text>
          </FrontBox>
          <Timer>
            <TimerText>
              <Countdown
                date={Date.now() + 150000}
                renderer={renderer}
              ></Countdown>
            </TimerText>
          </Timer>
        </BackPart>
        <NameSlide lobby={lobby} />
        <Start variant="contained" onClick={handleJoinRoom} color="success">
          <Text>Start</Text>
        </Start>
        <End variant="contained" onClick={handleEndNow} color="error">
          <Text>End</Text>
        </End>
      </>
    );
  }

  return (
    <>
      <AccountProvider>
        <Appbar account={account} />
      </AccountProvider>
      <BackPart>
        <FrontBox>
          <Text>{topicHeader}</Text>
        </FrontBox>
        <FrontBox sx={{ width: "450px" }}>
          <Text sx={{ width: "400px" }}>{topic}</Text>
        </FrontBox>
        <Timer>
          <TimerText>
            <Countdown
              date={Date.now() + 150000}
              renderer={renderer}
            ></Countdown>
          </TimerText>
        </Timer>
      </BackPart>
      <NameSlide lobby={lobby} />
      <Start variant="contained" onClick={handleJoinRoom} color="success">
        <Text>Start</Text>
      </Start>
      <End variant="contained" onClick={handleEndNow} color="error">
        <Text>End</Text>
      </End>
    </>
  );
}

export default BarCat;
