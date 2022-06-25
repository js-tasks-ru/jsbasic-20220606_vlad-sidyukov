function highlight(table) {
  const tHead = table.querySelector('thead');
  const tdHeadCollection = tHead.querySelectorAll('td');

  let statusTdIndex;
  let ageTdIndex;
  let genderTdIndex;

  for (let td of tdHeadCollection) {
    switch (td.textContent) {
      case "Status":
        statusTdIndex = td.cellIndex;
        break;

      case "Gender":
        genderTdIndex = td.cellIndex;
        break;

      case "Age":
        ageTdIndex = td.cellIndex;
        break;
    }
  }

  const tBody = table.querySelector('tbody');
  const tBodyRowsCollection = tBody.rows;

  for (let row of tBodyRowsCollection) {
    let tdCollection = row.cells;

    const tdStatusAttribute = tdCollection[statusTdIndex].getAttribute('data-available');
    switch (tdStatusAttribute) {
      case 'true':
        row.classList.add('available');
        break;

      case 'false':
        row.classList.add('unavailable');
        break;

      case null:
        row.hidden = true;
        break;
    }

    const tdGenderContent = tdCollection[genderTdIndex].textContent;
    switch (tdGenderContent) {
      case 'm':
        row.classList.add('male');
        break;
        
      case 'f':
        row.classList.add('female');
        break;
    }

    const tdAgeContent = tdCollection[ageTdIndex].textContent;
    if (Number(tdAgeContent) < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}

