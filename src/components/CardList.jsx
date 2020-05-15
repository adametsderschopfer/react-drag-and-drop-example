import React from "react";
import { useSelector, useDispatch } from "react-redux";
import update from "immutability-helper";

import Card from "./Card";
import { updateContentWhenDND } from "../store/actions/cardsActions";

const CardList = () => {
  const { cards } = useSelector((state) => state.cards);
  const dispath = useDispatch();

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    dispath(
      updateContentWhenDND(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      )
    );
  };

  return (
    <div className="cardWrapper">
      {!cards.length ? (
        <span className="doNotHaveCards">Карточек пока нет!</span>
      ) : (
        cards.map((card, ind) => (
          <Card 
            index={ind} 
            id={card.id}
            text={{title: card.title, descr: card.description, id: card.id }}
            moveCard={moveCard} 
            key={ind} 
          />
        ))
      )}
    </div>
  );
};

export default CardList;
