import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage } from "./MainPage";
import { CardPage } from "./CardPage";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/card/:id" component={CardPage} />
    </Switch>
  );
};
