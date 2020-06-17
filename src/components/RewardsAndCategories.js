import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react' // 6.x
import * as mobx from 'mobx';
import { RewardsAndCategoriesTable } from './RewardsAndCategoriesTable'
import { store, CATEGORIES, initialRewardsData } from './RewardsStore';
import './styles.css';

const LS_KEY = 'rewards-data';

export const RewardsAndCategories = () => {
  useEffect(() => {
    const rewardsData = window.localStorage.getItem(LS_KEY);
    store.setData(rewardsData ? JSON.parse(rewardsData) : initialRewardsData);
  }, [])

  const handleDelete = ({rowInd, colInd}) => () => {
    const updatedData = JSON.parse(JSON.stringify(store.data));
    const updatedHistory = JSON.parse(JSON.stringify(store.undoHistory));
    updatedData[rowInd][colInd] = {val: null};
    updatedHistory.push(store.data);
    store.setUndoHistory(updatedHistory);
    store.setData(updatedData);
  }

  const handleItemDropped = ({rowInd, colInd}) => (item, draggedFrom) => {
    const updatedData = JSON.parse(JSON.stringify(store.data)); // make a copy of the existing data
    const updatedHistory = JSON.parse(JSON.stringify(store.undoHistory));
    if (item === updatedData[rowInd][0].val) { // only update items if they are dragged within the same row
      updatedData[rowInd][colInd] = {val: item};
      if (draggedFrom > 0) {
        updatedData[rowInd][draggedFrom] = {val: null};
      }
      updatedHistory.push(store.data); // add current state to the history, so it can be restored later
      store.setUndoHistory(updatedHistory);
      store.setRedoHistory([]);
      store.setData(updatedData);
    }
  }

  const handleUndo = () => {
    const updatedUndoHistory = JSON.parse(JSON.stringify(store.undoHistory));
    const undoneChange = updatedUndoHistory.pop();
    store.setUndoHistory(updatedUndoHistory);
    const updatedRedoHistory = JSON.parse(JSON.stringify(store.redoHistory));
    updatedRedoHistory.push(mobx.toJS(store.data));
    store.setRedoHistory(updatedRedoHistory);
    
    store.setData(undoneChange);
  }

  const handleRedo = () => {
    const updatedRedoHistory = JSON.parse(JSON.stringify(store.redoHistory));
    const redoChange = updatedRedoHistory.pop();
    store.setRedoHistory(updatedRedoHistory);
    const updatedHistory = JSON.parse(JSON.stringify(store.undoHistory));
    updatedHistory.push(store.data);
    store.setUndoHistory(updatedHistory);

    store.setData(redoChange);
  }

  const handleSave = () => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(store.data));
  }

  return useObserver(() => 
    <div className="rewards-categories-container">
      <div className="rewards-categories-buttons">
        <button disabled={store.undoHistory.length===0} onClick={handleUndo}>Undo</button>
        <button disabled={store.redoHistory.length===0} onClick={handleRedo}>Redo</button>
      </div>
      <RewardsAndCategoriesTable
        categories={CATEGORIES}
        tableData={mobx.toJS(store.data)}
        handleDelete={handleDelete}
        handleItemDropped={handleItemDropped}
      />
      <div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}