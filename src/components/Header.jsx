import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { draggableToggler } from "../store/actions/cardsActions";
import ModalAdd from "./ModalAdd";

export const Header = () => {
  const [modal, setModal] = useState(false);
  const { draggableToggle } = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="customToggleBtn">
        <div
          className="customBtn"
          style={{ right: !draggableToggle && 2, left: draggableToggle && 2, background: draggableToggle ? 'green' : 'red' }}
          onClick={() => dispatch(draggableToggler(draggableToggle))}
        >
          {!draggableToggle ? "off" : "on"}
        </div>
      </div>

      <button
        className="btn-add"
        onClick={() => setModal((prev) => (prev ? false : true))}
      >
        Добавить
      </button>

      {modal && <ModalAdd toggle={setModal} />}
    </header>
  );
};
