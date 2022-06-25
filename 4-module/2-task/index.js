function makeDiagonalRed(table) {
  const rowsCollection = table.rows;
  for (let i = 0; i < rowsCollection.length; i++) {
    rowsCollection[i].cells[i].style.backgroundColor = 'red';
  }
}
