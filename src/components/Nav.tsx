import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useAuth0 } from "../utils/hooks";

export default function Nav() {
  const { isAuthenticated, logout } = useAuth0();

  const logoutHandler = () => {
    if (logout) {
      return logout();
    }
  };

  return (
    <div>
      <List>
        {[
          {
            name: "Home",
            to: "/"
          },
          {
            name: "Route A",
            to: "/a"
          },
          {
            name: "Route B",
            to: "/b"
          }
        ].map(item => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.to}
            style={{ display: "inline-block" }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      {isAuthenticated ? (
        <button onClick={logoutHandler}>Log Out</button>
      ) : null}
    </div>
  );
}
