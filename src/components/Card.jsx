import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { DragSource, DropTarget } from "react-dnd";

import ItemTypes from "../ForDND/ItemTypes";
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  cursor: 'move',
}
const Card = forwardRef(
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
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));

    return (
      <div className="card" style={{ ...style, opacity }}>
        <h1>{title.length > 6 ? title.substr(0, 6) + "..." : title}</h1>
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
      console.log(`props`, props);

      if (!component) {
      console.log('47', true)

        return null;
      }
      console.log('49', true)
      const node = component.getNode();
      if (!node) {
      console.log('54', true)

        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
      console.log('62', true)

        return;
      }

      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      console.log('72', true)

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      console.log('77', true)


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      console.log('83', true)
      
      props.moveCard(dragIndex, hoverIndex);
      console.log(`props`, props);
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
