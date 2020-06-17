import React from 'react';

export const DropTarget = (props) => {
  function dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = props.dropEffect;
  }
  
  function dragEnter(ev) {
    ev.dataTransfer.dropEffect = props.dropEffect;
  }

  function drop(ev) {
    const droppedItem = ev.dataTransfer.getData("drag-item");
    if (droppedItem) {
      props.onItemDropped(droppedItem);
    }
  }
  return (
    <div onDragOver={dragOver} onDrop={drop}>
      {props.children}
    </div>);
};
