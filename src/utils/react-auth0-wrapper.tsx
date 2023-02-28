import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export interface ContextValue {
  isAuthenticated?: boolean;
  user?: any;
  loading?: boolean;
  popupOpen?: boolean;
  loginWithPopup?: () => void;
  handleRedirectCallback?: () => void;
  getIdTokenClaims?: (...p: any) => void;
  loginWithRedirect?: (...p: any) => void;
  getTokenSilently?: (...p: any) => void;
  getTokensWithPopup?: (...p: any) => void;
  logout?: (...p: any) => void;
}

interface Auth0ProviderProps extends Auth0ClientOptions {
  onRedirectCallback?: (appState: any) => void;
  children: React.ReactNode;
  initOptions?: Auth0ClientOptions;
}

const DEFAULT_REDIRECT_CALLBACK = (appState: any) =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<ContextValue>(
  {} as ContextValue
);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async () => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup();
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }

    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
        getTokensWithPopup: (...p: any) => auth0Client.getTokensWithPopup(...p),
        logout: (...p: any) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
