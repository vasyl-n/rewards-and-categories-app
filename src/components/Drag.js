import React from 'react';

export const Drag = (props) => {
  function startDrag(ev) {
    console.log(props.dataItem)
    ev.dataTransfer.setData("drag-item", props.dataItem);
    ev.dataTransfer.effectAllowed = props.dropEffect;
  }
  
  return (
    <div draggable onDragStart={startDrag}>
      {props.children}
    </div>
  );
};
