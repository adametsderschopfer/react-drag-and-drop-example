import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCard } from "../store/actions/cardsActions";

const ModalAdd = ({ toggle }) => {
  const { cards } = useSelector(state => state.cards)
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false)
  const [cardObj, setCardObj] = useState({
    title: "",
    description: "",
  });

  const inputHandler = (e) => {
    return setCardObj({ ...cardObj, [e.target.name]: e.target.value });
  };

  const createHandler = async (e) => {
    e.preventDefault();
    setAlert(false)
    if (!cardObj.title.trim() || !cardObj.description.trim()) {
      return setAlert(true)
    }

    await dispatch(createCard(cardObj, cards));

    setCardObj({
      title: "",
      description: "",
    });

    toggle(false)
  };

  return (
    <div className="modal">

      <form onSubmit={createHandler}>
        <div className="closeModal" onClick={() => toggle(false)}>x</div>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={inputHandler}
          value={cardObj.title}
        />
        <textarea
          type="text"
          name="description"
          placeholder="description"
          onChange={inputHandler}
          value={cardObj.description}
        />
        <button type="submit">Создать</button>
        <br/>
        {alert && <span style={{color: '#fff'}}>Ошибка в заполнение полей!</span>}
      </form>
    </div>
  );
};

export default ModalAdd;
