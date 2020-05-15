import React from "react";
import { withRouter, NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const CardPage = (props) => {
  const path = props.match.params.id;

  const { cards } = useSelector((state) => state.cards);

  const neededEl = cards.find((v) => v.id.toString() === path);

  if (!neededEl) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <NavLink to="/">На главную</NavLink>
      <div className="cardPage">
        <h1>{neededEl.title}</h1>
        <p>{neededEl.description}</p>
      </div>
    </div>
  );
};

withRouter(CardPage);

export { CardPage };
