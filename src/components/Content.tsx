import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Home = () => <div>Home</div>;
const A = () => <div>A</div>;
const B = () => <div>B</div>;

export default function Content() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/a" component={A} />
      <PrivateRoute path="/b" component={B} />
    </Switch>
  );
}
