import {
  ADD_CARD,
  DRAGGABLE_ON,
  DRAGGABLE_OFF,
  CONTENT_UPDATE,
  UPDATE_CONTENT_WHEN_DND,
} from "../types";

const initialState = {
  cards: [],
  draggableToggle: false,
};

const getLocal = () => {
  if (localStorage.getItem("cards")) {
    return JSON.parse(localStorage.getItem("cards"));
  }
  return [];
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.card] };

    case CONTENT_UPDATE:
      return { ...state, cards: [...state.cards, ...getLocal()] };

    case DRAGGABLE_ON:
      return { ...state, draggableToggle: true };

    case UPDATE_CONTENT_WHEN_DND:
      return { ...state, cards: action.cards } 

    case DRAGGABLE_OFF:
      return { ...state, draggableToggle: false };

    default:
      return state;
  }
};
