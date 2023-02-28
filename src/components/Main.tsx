import React from "react";
import Nav from "./Nav";
import Content from "./Content";

const Main = () => {
  return (
    <div>
      <nav>
        <Nav />
      </nav>
      <main>
        <Content />
      </main>
    </div>
  );
};

export default Main;
