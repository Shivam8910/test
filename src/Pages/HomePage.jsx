import { Avatar, Button, Container, Typography } from "@mui/material";
import Appbar from "../Components/Appbar";
import { useNavigate } from "react-router-dom";
import AccountProvider from "../context/AccountProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToExistingPage = () => {
    navigate("/existsession");
  };

  const navigateToCreateSession = () => {
    navigate("/createsession");
  };

  return (
    <div>
      <AccountProvider>
        <Appbar />
      </AccountProvider>

      {isAuthenticated ? (
        <Container
          sx={{
            display: "flex",
            height: "23rem",
            position: "relative",
            top: "10rem",
          }}
        >
          <Container
            sx={{
              width: "60%",
              position: "relative",
              top: "14rem",
              left: "-5rem",
            }}
          >
            <Container sx={{ width: "45rem", marginRight: "8rem" }}>
              <Typography variant="regular">{t("homepmessage")}</Typography>
            </Container>
            <Container sx={{ marginTop: "2rem" }}>
              <Button
                variant="contained"
                color="pri"
                sx={{
                  width: "220px",
                  marginLeft: "2rem",
                  borderRadius: "25px",
                  marginX: ".5rem",
                  paddingY: "1rem",
                }}
                onClick={navigateToCreateSession}
              >
                <Typography
                  variant="medium"
                  sx={{ color: "white", textTransform: "initial" }}
                >
                  {t("newsession")}
                </Typography>
              </Button>
              <Button
                variant="contained"
                color="bg"
                sx={{
                  width: "220px",
                  borderRadius: "25px",
                  marginX: ".5rem",
                  marginLeft: "1rem",
                  paddingY: "1rem",
                }}
                onClick={navigateToExistingPage}
              >
                <Typography variant="medium" sx={{ textTransform: "initial" }}>
                  {t("existingsession")}
                </Typography>
              </Button>
            </Container>
          </Container>
          <Container sx={{ width: "40%" }}>
            <Avatar
              alt="Remy Sharp"
              src="src/images/HomePage.jpg"
              sx={{ width: "30rem", height: "30rem", left: "1rem" }}
            />
          </Container>
        </Container>
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              height: "23rem",
              position: "relative",
              top: "10rem",
            }}
          >
            <Container
              sx={{ width: "60%", position: "relative", top: "14rem" }}
            >
              <Container
                sx={{ width: "45rem", marginRight: "8rem" }}
              ></Container>
            </Container>
            <Container sx={{ width: "40%" }}>
              <Avatar
                alt="Remy Sharp"
                src="src/images/HomePage.jpg"
                sx={{ width: "30rem", height: "30rem", left: "1rem" }}
              />
            </Container>
          </Container>
        </>
      )}
    </div>
  );
}
export default HomePage;
