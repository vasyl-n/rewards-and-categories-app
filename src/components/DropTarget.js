import React from 'react';

export const DropTarget = (props) => {
  function dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = props.dropEffect;
  }
  
  function drop(ev) {
    const droppedItem = ev.dataTransfer.getData("drag-item");
    const draggedFrom = ev.dataTransfer.getData("dragged-from");
    if (droppedItem) {
      props.onItemDropped(droppedItem, draggedFrom);
    }
  }
  return (
    <div onDragOver={dragOver} onDrop={drop}>
      {props.children}
    </div>);
};
