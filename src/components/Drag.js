import React from 'react';

export const Drag = (props) => {
  function startDrag(ev) {
    ev.dataTransfer.setData("drag-item", props.dataItem);
    ev.dataTransfer.setData("dragged-from", props.draggedFrom);
  }
  
  return (
    <div draggable onDragStart={startDrag}>
      {props.children}
    </div>
  );
};
