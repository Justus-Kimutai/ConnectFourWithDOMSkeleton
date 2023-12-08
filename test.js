//Understanding the concept of filtering and mapping on arrays

const myArrr = [
    [0,0,0,0,1,1,0,2,0,0,2,2],
    [2,0,0,0,1,0,0,2,0,0,2,2],
    [0,0,0,0,1,1,0,2,0,0,2,2],
    [2,0,0,0,1,0,0,2,0,0,2,2]
]

const AvailableCells = myArrr.filter(row=>row[0] === 0).map(row=>row[0])

console.table(AvailableCells);

// AvailableCells.map(row=>row[0])

// console.table(AvailableCells)