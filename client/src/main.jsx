import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import AccountProvider from "./context/AccountProvider.jsx";
import "./index.css";
import "./i18n";
import { CurrentUserProvider } from "./context/CurrentUserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-0twpq3yt1xxwlh3l.us.auth0.com"
      clientId="38kRsMh5plIk5Yzlzv35okcuUkMK09MX"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <CurrentUserProvider>
        <AccountProvider>
          <App />
        </AccountProvider>
      </CurrentUserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
