import React from 'react';
import { Reward } from './Reward';

export const RewardsAndCategoriesTable = ({categories, tableData, handleDelete, handleItemDropped}) => {
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

  return <table className="rewards-categories-table">
    <tr className="header-row-1">
      <th colSpan="1">Rewards</th>
      <th colSpan={categories.length}>Categories</th>
    </tr>
    <tr className="header-row-2">
      <td></td>
      {
        categories.map(category => {
          return <th key={category} scope="col">{category}</th>
        })
      }
    </tr>
    {
      renderDataRows(tableData)
    }
  </table>
}