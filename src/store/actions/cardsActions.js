import {
  DRAGGABLE_OFF,
  DRAGGABLE_ON,
  ADD_CARD,
  CONTENT_UPDATE,
  UPDATE_CONTENT_WHEN_DND,
} from "../types";

export const draggableToggler = (draggableToggle) => (dispatch) => {
  if (draggableToggle) {
    return dispatch({ type: DRAGGABLE_OFF });
  }

  return dispatch({ type: DRAGGABLE_ON });
};

export const update = () => {
  return (dispatch) => {
    dispatch({
      type: CONTENT_UPDATE,
    });
  };
};

export const updateContentWhenDND = (cards) => (dispatch) => {
  dispatch({ type: UPDATE_CONTENT_WHEN_DND, cards });
  const changedCards = JSON.stringify(cards);
  localStorage.setItem("cards", changedCards);
};

export const createCard = (cardObj, cards) => (dispatch) => {
  const newCard = { ...cardObj, id: Math.floor(Math.random() * (50 * 50)) };

  const cardsLocal = JSON.stringify([...cards, newCard]);
  localStorage.setItem("cards", cardsLocal);

  dispatch({
    type: ADD_CARD,
    card: newCard,
  });
};
