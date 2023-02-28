import React from "react";
import { Router } from "react-router-dom";

import { useAuth0 } from "../utils/hooks";
import history from "../utils/history";
import Login from "./Login";
import Main from "./Main";

const App = () => {
  const { isAuthenticated, loading } = useAuth0();

  if (loading === undefined && isAuthenticated === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Router history={history}>
      <div>{isAuthenticated ? <Main /> : <Login />}</div>
    </Router>
  );
};

export default App;
