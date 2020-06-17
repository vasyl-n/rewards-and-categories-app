import React, { useState } from 'react';
import { Drag } from './Drag';
import { DropTarget } from './DropTarget';
import './styles.css';

const CATEGORIES = ['C1', 'C2', 'C3', 'C4', 'C5'];
const REWARDS = ['R1', 'R2', 'R3', 'R4', 'R5'];

export const RewardsAndCategories = () => {
  const initialRewardsData = REWARDS.map(reward => {
    return [{val: reward, isDraggable: true}, ...CATEGORIES.map(cat => ({val: ''}))];
  })
  const [data, setData] = useState(initialRewardsData);
  console.log(data)
  const handleItemDropped = (rowInd, colInd) => (item) => {
    console.log(rowInd, colInd, item)
    const updatedData = JSON.parse(JSON.stringify(data));
    if (item === updatedData[rowInd][0].val) { // only update items if they are dragged within the same row
      updatedData[rowInd][colInd] = {val: item};
      setData(updatedData);
    }
  }

  return (
    <table className="rewards-categories-table">
      <tr className="header-row-1">
        <th colspan="1">Rewards</th>
        <th colspan={CATEGORIES.length}>Categories</th>
      </tr>
      <tr className="header-row-2">
        <td></td>
        {
          CATEGORIES.map(category => {
            return <th key={category} scope="col">{category}</th>
          })
        }
      </tr>
      {
        data.map((row, rowInd) => {
          return (
            <tr className="content-row">
              {
                row.map((el, colInd) => {
                return <td>
                    {
                      el.isDraggable ? 
                        <Drag dataItem={el.val}><div className="reward-item">{el.val}</div></Drag>
                      :
                      <DropTarget onItemDropped={handleItemDropped(rowInd, colInd)}>
                        <div className={`${el.val ? 'reward-item': 'reward-item--empty'}`}>{el.val}</div>
                      </DropTarget>
                    }
                  </td>
                })
              }
            </tr>
          )
        })
      }
    </table>
  )
}