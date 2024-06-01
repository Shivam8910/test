import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createLobby } from "../service/lobbyApi";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext, useState } from "react";

function TopicItem({ topicHeader, topic, language }) {
  const theme = useTheme();
  const { currentUser, loading } = useContext(CurrentUserContext);
  const { isAuthenticated } = useAuth0();
  const [picture] = useState(null);

  // Custom styled components using emotion
  const CustomCard = styled(Card)(() => ({
    height: "3.5rem",
    width: "15rem",
    backgroundColor: theme.palette.gray.main,
    borderRadius: "10px",
    margin: "1.4rem 1.5rem",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
      boxShadow: theme.shadows[10],
      transform: "scale(1.02)",
      transition: "transform 0.2s ease-in-out",
    },
  }));

  const CardContent = styled(Typography)(() => ({
    paddingTop: "15px",
    fontFamily: "Montserrat",
    fontWeight: "100",
    fontSize: "12px",
    letterSpacing: "1px",
  }));

  const navigate = useNavigate();
  const lobbyId = crypto.randomUUID();

  const handleClick = useCallback(() => {
    // Ensure language is selected before creating a lobby
    if (!language) {
      alert("Please select the language before creating the lobby");
      return;
    }

    // Lobby object with relevant details
    const lobby = {
      lobbyId: lobbyId,
      topicHeader: topicHeader,
      topicName: topic,
      language: language,
      userCount: 1,
      hasMeetingStarted: false,
      users: [
        {
          name: currentUser?.name,
          email: currentUser?.email,
          picture: currentUser?.picture
            ? currentUser?.picture.startsWith("http")
              ? currentUser?.picture
              : `https://test-micmzxzzv-shivam8910s-projects.vercel.app/${currentUser?.picture}`
            : picture
            ? URL.createObjectURL(picture)
            : "fallback_image_url.jpg",
        },
      ],
    };

    const addLobby = async () => {
      await createLobby(lobby);
    };

    // Create lobby and navigate to the newly created lobby page
    addLobby();
    navigate(`/barcat/${language}/${topicHeader}/${topic}/${lobbyId}`);
  }, [
    language,
    lobbyId,
    navigate,
    topic,
    topicHeader,
    currentUser?.email,
    currentUser?.name,
    picture,
    currentUser?.picture,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !currentUser) {
    return <div>No user data available</div>;
  }

  return (
    <CustomCard>
      <CardContent color="white" onClick={handleClick}>
        {topic}
      </CardContent>
    </CustomCard>
  );
}

export default TopicItem;
