import { combineReducers } from "redux";
import { cardsReducer } from "./reducer/cardsReducer";


export const rootReducer = combineReducers({
  cards: cardsReducer
})