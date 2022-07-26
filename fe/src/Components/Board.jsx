import React from "react";

export default function Board(props) {
  const { playes, onClick } = props;
  return (
    <div className="gameContainer">
      <table cellSpacing="0">
        <tbody>
          {playes.map((col, colInd) => (
            <tr key={colInd}>
              {col.map((row, rowInd) => (
                <td
                  key={colInd + rowInd}
                  className={
                    (colInd === 1 ? "verti-border " : "") +
                    (rowInd === 1 ? "hori-border " : "")
                  }
                  onClick={() => onClick(colInd, rowInd)}
                >
                  {row}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
