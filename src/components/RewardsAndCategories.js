import React, { useState } from 'react';

import { Reward } from './Reward';
import './styles.css';

const CATEGORIES = ['C1', 'C2', 'C3', 'C4', 'C5'];
const REWARDS = ['R1', 'R2', 'R3', 'R4', 'R5'];

export const RewardsAndCategories = () => {
  const initialRewardsData = REWARDS.map(reward => {
    return [{val: reward, isDraggable: true}, ...CATEGORIES.map(cat => ({val: null}))];
  })
  const [data, setData] = useState(initialRewardsData);

  const handleDelete = ({rowInd, colInd}) => () => {
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData[rowInd][colInd] = {val: null};
    setData(updatedData);
  }

  const handleItemDropped = ({rowInd, colInd}) => (item, draggedFrom) => {
    console.log(draggedFrom)
    const updatedData = JSON.parse(JSON.stringify(data)); // make a copy of the existing data
    if (item === updatedData[rowInd][0].val) { // only update items if they are dragged within the same row
      updatedData[rowInd][colInd] = {val: item};
      if (draggedFrom > 0) {
        updatedData[rowInd][draggedFrom] = {val: null};
      }
      setData(updatedData);
    }
  }

  const renderDataRows = (data) => {
    return data.map((row, rowInd) => {
      return (
        <tr className="content-row" key={rowInd}>
          {
            row.map((reward, colInd) => {
              return <td key={colInd}>
                {
                  <Reward
                    reward={reward}
                    handleItemDropped={handleItemDropped({rowInd, colInd})}
                    handleDelete={handleDelete({rowInd, colInd})}
                    colInd={colInd}
                  />
                }
              </td>
            })
          }
        </tr>
      )
    })
  }
console.log(data)
  return (
    <table className="rewards-categories-table">
      <tr className="header-row-1">
        <th colSpan="1">Rewards</th>
        <th colSpan={CATEGORIES.length}>Categories</th>
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
        renderDataRows(data)
      }
    </table>
  )
}