function createTableRow(task) {
    var tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${task.userId}</td>
      <td>${task.title}</td>
      <td>${task.completed}</td>
  `;
    return tableRow;
}

// Функция для отрисовки таблицы
function renderTable(content) {
    var tableBody = document.getElementById("post");
    tableBody.innerHTML = ""; // Очищаем таблицу перед заполнением

    content.forEach(function (task) {
        var tableRow = createTableRow(task);
        tableBody.appendChild(tableRow);
    });
}

const sortState = {
    userId: 'asc',
    title: 'asc',
    completed: 'asc'
};

// Функция для сортировки таблицы по столбцу
function sortTable(column) {
    const list = document.getElementById("post");
    let content = JSON.parse(localStorage.getItem("content"));

    content.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        if (typeof valA === "boolean") {
            valA = valA ? 1 : 0;
            valB = valB ? 1 : 0;
        }

        if (sortState[column] === 'asc') {
            return valA > valB ? 1 : -1;
        } else {
            return valA < valB ? 1 : -1;
        }
    });

    // Переключение состояния сортировки
    sortState[column] = sortState[column] === 'asc' ? 'desc' : 'asc';

    renderTable(content);
}

// грузим таблицу с json
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://jsonplaceholder.typicode.com/users/5/todos")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("content", JSON.stringify(data));
            renderTable(data);
        })
        .catch((error) => console.error("Ошибка загрузки данных:", error));
});

// Обработка клика
document.addEventListener("click", function (event) {
    if (event.target.tagName === "TH") {
        var columnName = event.target.dataset.column;
        sortTable(columnName);
    }
});
