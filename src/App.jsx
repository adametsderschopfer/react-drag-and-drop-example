import React, { useEffect } from "react";
import { Routes } from "./pages/routes";
import { useDispatch } from "react-redux";
import { update } from "./store/actions/cardsActions";

export const App = () => {
  const dispath = useDispatch()

  useEffect(() => {
    dispath(update())    
  });

  return (
    <div className="container">
      <Routes />
    </div>
  );
};
