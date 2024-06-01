import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { useAuth0 } from "@auth0/auth0-react";
import { addUser, getUsers } from "../service/api";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Appbar() {
  const navigate = useNavigate();
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [, setSelectedValue] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const languageOptions = { English: "en", Hindi: "hi", German: "de" };
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const theme = useTheme();

  const CustomAppBar = styled(AppBar)(() => ({
    backgroundColor: "white",
    padding: "1.2rem 9rem 1rem 9rem",
    display: "flex",
  }));

  const Logo = styled(Card)(() => ({
    backgroundColor: theme.palette.bg.main,
    width: 260,
    height: 55,
    borderRadius: "15px",
  }));

  const LogoContent = styled(CardContent)(() => ({
    textAlign: "center",
    marginTop: "3px",
  }));

  const adduser = async () => {
    if (isAuthenticated) {
      await addUser(user);
    } else {
      console.log("error");
    }
  };

  if (isAuthenticated) {
    adduser();
  }

  const navigateToServices = () => {
    navigate("/services");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToProfile = () => {
    navigate("/profile", { state: { language: i18n.language } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (user) {
          const loggedInUser = response.find((u) => u.sub === user.sub);
          setCurrentUser(loggedInUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const [picture] = useState(null);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLanguageIconClick = () => {
    setLanguageDialogOpen(true);
  };

  const handleLanguageDialogClose = (value) => {
    setLanguageDialogOpen(false);
    setSelectedValue(value);
  };

  const handleListItemClick = (value) => {
    const languageCode = languageOptions[value];
    i18n.changeLanguage(languageCode);
    handleLanguageDialogClose(value);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <CustomAppBar sx={{ boxShadow: 0 }}>
      <Logo sx={{ boxShadow: 0 }}>
        <LogoContent>
          <Typography variant="header2" color="black">
            CollabNSpeak
          </Typography>
        </LogoContent>
      </Logo>

      <Box sx={{ marginLeft: "auto", marginTop: "-60px" }}>
        <Toolbar>
          <Button onClick={navigateToHome}>
            <Typography variant="medium" color="black" sx={{ paddingX: "5px" }}>
              {t("home")}
            </Typography>
          </Button>

          <Button onClick={navigateToServices}>
            <Typography variant="medium" color="black" sx={{ paddingX: "5px" }}>
              {t("services")}
            </Typography>
          </Button>

          <Button>
            <Typography variant="medium" color="black" sx={{ paddingX: "5px" }}>
              {t("about")}
            </Typography>
          </Button>

          <IconButton onClick={handleLanguageIconClick}>
            <LanguageIcon />
          </IconButton>

          <Dialog onClose={handleLanguageDialogClose} open={languageDialogOpen}>
            <DialogTitle>Select Language</DialogTitle>
            <List sx={{ pt: 0 }}>
              {Object.keys(languageOptions).map((language) => (
                <ListItem disableGutters key={language}>
                  <ListItemButton onClick={() => handleListItemClick(language)}>
                    <ListItemText primary={language} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Dialog>

          {isAuthenticated && currentUser ? (
            <>
              <Tooltip title="Account">
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  size="small"
                  sx={{ ml: 1 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src={
                      currentUser.picture
                        ? currentUser.picture.startsWith("http")
                          ? currentUser.picture
                          : `https://test-micmzxzzv-shivam8910s-projects.vercel.app/${currentUser.picture}`
                        : picture
                        ? URL.createObjectURL(picture)
                        : "fallback_image_url.jpg"
                    }
                    sx={{ width: 35, height: 35 }}
                  >
                    {currentUser.name}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 11.5,
                    ml: 149,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box onClick={navigateToProfile}>
                  <MenuItem onClick={handleMenuClose}>
                    <Avatar />{" "}
                    <Box sx={{ textDecoration: "none" }}>{t("profile")}</Box>
                  </MenuItem>
                </Box>

                <Box
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {t("logout")}
                  </MenuItem>
                </Box>
              </Menu>
            </>
          ) : (
            <Button onClick={() => loginWithRedirect()} color="primary">
              Log In
            </Button>
          )}
        </Toolbar>
      </Box>
    </CustomAppBar>
  );
}

export default Appbar;
