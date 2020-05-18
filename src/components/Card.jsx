import React, { useImperativeHandle, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DragSource, DropTarget } from "react-dnd";

import ItemTypes from "../ForDND/ItemTypes";
import { useSelector } from "react-redux";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  cursor: "move",
};

const Card = React.forwardRef(
  (
    {
      text: { title, descr, id },
      isDragging,
      connectDragSource,
      connectDropTarget,
    },
    ref
  ) => {
    const elementRef = useRef(null);
    const pop = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;

    const { draggableToggle } = useSelector(state => state.cards)

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));

    return (
      <div ref={draggableToggle ? elementRef : pop} className="card" style={{ ...style, opacity }}>
        <h1 className="title">{title.length > 6 ? title.substr(0, 6) + "..." : title}</h1>
        <div className="description">
          {descr.length > 80 ? descr.substr(0, 80) + "..." : descr}
        </div>
        <NavLink to={`/card/${id}`}>Открыть полностью</NavLink>
      </div>
    );
  }
);

export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }

      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = node.getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 24;

      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.x - hoverBoundingRect.right;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Card)
);
