import React, { useState } from 'react';
import { RewardsAndCategoriesTable } from './RewardsAndCategoriesTable'
import './styles.css';

const CATEGORIES = ['C1', 'C2', 'C3', 'C4', 'C5'];
const REWARDS = ['R1', 'R2', 'R3', 'R4', 'R5'];

export const RewardsAndCategories = () => {
  const initialRewardsData = REWARDS.map(reward => {
    return [{val: reward, isDraggable: true}, ...CATEGORIES.map(cat => ({val: null}))];
  });
  const [data, setData] = useState(initialRewardsData);
  const [history, setHistory] = useState([]);

  const handleDelete = ({rowInd, colInd}) => () => {
    const updatedData = JSON.parse(JSON.stringify(data));
    const updatedHistory = JSON.parse(JSON.stringify(history));
    updatedData[rowInd][colInd] = {val: null};
    updatedHistory.push(data);
    setHistory(updatedHistory);
    setData(updatedData);
  }

  const handleItemDropped = ({rowInd, colInd}) => (item, draggedFrom) => {
    const updatedData = JSON.parse(JSON.stringify(data)); // make a copy of the existing data
    const updatedHistory = JSON.parse(JSON.stringify(history));
    if (item === updatedData[rowInd][0].val) { // only update items if they are dragged within the same row
      updatedData[rowInd][colInd] = {val: item};
      if (draggedFrom > 0) {
        updatedData[rowInd][draggedFrom] = {val: null};
      }
      updatedHistory.push(data);
      setHistory(updatedHistory);
      setData(updatedData);
    }
  }

  const handleUndo = () => {
    const updatedHistory = JSON.parse(JSON.stringify(history));
    setData(updatedHistory.pop());
    setHistory(updatedHistory);
  }

  console.log(history)
  return (
    <div className="rewards-categories-container">
      <div className="rewards-categories-buttons">
        <button disabled={history.length===0} onClick={handleUndo}>Undo</button>
        <button disabled={false}>Redo</button>
      </div>
      <RewardsAndCategoriesTable
        categories={CATEGORIES}
        tableData={data}
        handleDelete={handleDelete}
        handleItemDropped={handleItemDropped}
      />
    </div>
  )
}