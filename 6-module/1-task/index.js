/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

const createElementHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};


const createRowHtml = (html) => {
  const tr = document.createElement('TR');
  tr.innerHTML = html;
  return tr;
};

const createTableHeader = () => {
  return createElementHtml(`
    <table>
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody></tbody>
    </table>
  `);
};

const createRow = (row) => {
  return createRowHtml(`
  <tr>
    <td>${row.name}</td>
    <td>${row.age}</td>
    <td>${row.salary}</td>
    <td>${row.city}</td>
    <td><button>X</button></td>
  </tr>
  `);
};




export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.name = rows.name;
    this.age = rows.age;
    this.salary = rows.salary;
    this.city = rows.city;

    this.tableHeader = createTableHeader();
    this.tableTbody = this.tableHeader.querySelector('tbody');
    this.elem = this.createTable();
    this.clickRemoveRowButtonHandler = this.tableTbody.addEventListener('click', this.clickRemoveRowButtonHandler.bind(this));

  }

  createTable() {
    const tableFragment = new DocumentFragment();
    this.rows.forEach(row => {
      const newRow = createRow(row);
      tableFragment.append(newRow);
    });
    this.tableTbody.append(tableFragment);

    return this.tableHeader;
  }


  clickRemoveRowButtonHandler(evt) {
    if (evt.target.tagName === 'BUTTON') {
      const rowIndex = evt.target.closest('tr').sectionRowIndex;
      this.tableTbody.rows[rowIndex].remove();
    }
  }
}
