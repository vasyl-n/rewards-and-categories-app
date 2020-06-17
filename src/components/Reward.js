import React from 'react';
import { Drag } from './Drag';
import { DropTarget } from './DropTarget';

export const Reward = ({reward, handleItemDropped, handleDelete, colInd}) => {
  return (
    <React.Fragment>
      {
        reward.isDraggable ? 
        <Drag dataItem={reward.val}>
          <div className="reward-item">{reward.val}</div>
        </Drag>
        :
        <DropTarget onItemDropped={handleItemDropped}>
          <Drag dataItem={reward.val} draggedFrom={colInd}>
            <div className={`${reward.val ? 'reward-item': 'reward-item--empty'}`}>
              {reward.val}
              <div className="reward-delete-button" onClick={handleDelete}>&#10005;</div>
            </div>
          </Drag>
        </DropTarget>
      }
    </React.Fragment>
  )
}