import {
  Box,
  Typography,
  styled,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";

const BackPartN = styled(Box)`
  position: relative;
  width: 27rem;
  height: 50px;
  left: 33.5rem;
  top: 15rem;
  background: #2d8cff;
  border-radius: 18px;
  margin: 0.8rem 0;
  display: flex;
  display: "flex";
`;

const Name = styled(Typography)`
  position: "relative";
  padding: 1.6rem 1.5rem;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 20px;
  /* or 83% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  color: white;
`;

function NameSlide({ lobby }) {
  const { loading } = useContext(CurrentUserContext);
  const { isAuthenticated } = useAuth0();
  const [picture] = useState(null);
  if (lobby === null) {
    return <CircularProgress />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {lobby.users?.map((user) => {
        return (
          <BackPartN key={user.email}>
            <Name>{user.name}</Name>
            <Avatar
              alt="Remy Sharp"
              src={
                user.picture
                  ? user.picture.startsWith("http")
                    ? user.picture
                    : `http://localhost:8000/${user.picture}`
                  : picture
                  ? URL.createObjectURL(picture)
                  : "fallback_image_url.jpg"
              }
              sx={{
                width: 35,
                height: 35 /* Ellipse 18 */,
                top: 7,
                marginLeft: "auto",
                marginRight: "0.5rem",
              }}
            />
          </BackPartN>
        );
      })}
    </div>
  );
}

export default NameSlide;
