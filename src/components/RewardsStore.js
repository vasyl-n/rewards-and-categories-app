import React from 'react'
import * as mobx from 'mobx';

export const CATEGORIES = ['C1', 'C2', 'C3', 'C4', 'C5'];
const REWARDS = ['R1', 'R2', 'R3', 'R4', 'R5'];

export const initialRewardsData = REWARDS.map(reward => {
  return [{val: reward, isDraggable: true}, ...CATEGORIES.map(cat => ({val: null}))];
});

export const store = mobx.observable({ // using mobx store to store the data
  data: initialRewardsData,
  setData(newData) {
    store.data = newData;
  },
  undoHistory: [],
  setUndoHistory(newUndoHistory) {
    store.undoHistory = newUndoHistory;
  },
  redoHistory: [],
  setRedoHistory(newRedoHistory) {
    store.redoHistory = newRedoHistory;
  }
})
