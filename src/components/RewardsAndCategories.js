import React, { useState, useEffect } from 'react';
import { RewardsAndCategoriesTable } from './RewardsAndCategoriesTable'
import './styles.css';

const CATEGORIES = ['C1', 'C2', 'C3', 'C4', 'C5'];
const REWARDS = ['R1', 'R2', 'R3', 'R4', 'R5'];
const LS_KEY = 'rewards-data';

export const RewardsAndCategories = () => {
  const initialRewardsData = REWARDS.map(reward => {
    return [{val: reward, isDraggable: true}, ...CATEGORIES.map(cat => ({val: null}))];
  });
  const [data, setData] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  useEffect(() => {
    const rewardsData = window.localStorage.getItem(LS_KEY);
    setData(rewardsData ? JSON.parse(rewardsData) : initialRewardsData);
  }, [])

  const handleDelete = ({rowInd, colInd}) => () => {
    const updatedData = JSON.parse(JSON.stringify(data));
    const updatedHistory = JSON.parse(JSON.stringify(undoHistory));
    updatedData[rowInd][colInd] = {val: null};
    updatedHistory.push(data);
    setUndoHistory(updatedHistory);
    setData(updatedData);
  }

  const handleItemDropped = ({rowInd, colInd}) => (item, draggedFrom) => {
    const updatedData = JSON.parse(JSON.stringify(data)); // make a copy of the existing data
    const updatedHistory = JSON.parse(JSON.stringify(undoHistory));
    if (item === updatedData[rowInd][0].val) { // only update items if they are dragged within the same row
      updatedData[rowInd][colInd] = {val: item};
      if (draggedFrom > 0) {
        updatedData[rowInd][draggedFrom] = {val: null};
      }
      updatedHistory.push(data); // add current state to the history, so it can be restored later
      setUndoHistory(updatedHistory);
      setRedoHistory([]);
      setData(updatedData);
    }
  }

  const handleUndo = () => {
    const updatedUndoHistory = JSON.parse(JSON.stringify(undoHistory));
    const undoneChange = updatedUndoHistory.pop();
    setUndoHistory(updatedUndoHistory);
    setData(undoneChange);

    const updatedRedoHistory = JSON.parse(JSON.stringify(redoHistory));
    updatedRedoHistory.push(data);
    setRedoHistory(updatedRedoHistory);
  }

  const handleRedo = () => {
    const updatedURedoHistory = JSON.parse(JSON.stringify(redoHistory));
    const redoChange = updatedURedoHistory.pop();
    setData(redoChange);
    setRedoHistory(updatedURedoHistory);

    const updatedHistory = JSON.parse(JSON.stringify(undoHistory));
    updatedHistory.push(data);
    setUndoHistory(updatedHistory);
  }

  const handleSave = () => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(data));
  }

  return (
    <div className="rewards-categories-container">
      <div className="rewards-categories-buttons">
        <button disabled={undoHistory.length===0} onClick={handleUndo}>Undo</button>
        <button disabled={redoHistory.length===0} onClick={handleRedo}>Redo</button>
      </div>
      <RewardsAndCategoriesTable
        categories={CATEGORIES}
        tableData={data}
        handleDelete={handleDelete}
        handleItemDropped={handleItemDropped}
      />
      <div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}