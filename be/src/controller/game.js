const checkWin = (round, array) => {
    if (round < 4)
        return "";
    //row win
    let res = ""
    array.forEach((row) => {
        if (row.filter((val) => val === "X").length === 3)
            res = 2;
        if (row.filter((val) => val === "O").length === 3)
            res = 1;
    })
    //diagnol win
    if ((array[0][0] === array[1][1] && array[1][1] === array[2][2])
        || (array[2][0] === array[1][1] && array[1][1] === array[0][2]) && array[1][1] !== "")
        res = (round -1) % 2 + 1;
    //column win
    if ((array[0][0] === array[1][0] && array[0][0] === array[2][0] && array[0][0] !== "")
        || (array[0][1] === array[1][1] && array[0][1] === array[2][1] && array[0][1] !== "")
        || (array[0][2] === array[1][2] && array[0][2] === array[2][2] && array[0][2] !== ""))
        res = (round -1) % 2 + 1;
    return res;
}

const done = (array) =>{
    return array.reduce((sum, row ) => {
        sum += row.reduce((sumRow, row ) => 
            sumRow += row === "" ? 0 : 1, 0)
    },0)
}

module.exports = { checkWin, done };