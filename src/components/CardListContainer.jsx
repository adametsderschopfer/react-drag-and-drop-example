import React from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import CardList from "./CardList";

export const CardListContainer = () => {
  return (
    <main className="cardList">
      <DndProvider backend={Backend}>
        <CardList />
      </DndProvider>
    </main>
  );
};
