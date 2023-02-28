import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

import { Auth0Provider } from "./utils/react-auth0-wrapper";
import history from "./utils/history";
import App from "./components/App";

const onRedirectCallback = (appState?: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const rootElement = document.getElementById("root");
render(
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    client_id={process.env.AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  rootElement
);
