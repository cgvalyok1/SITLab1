async function getResponse() {
    let response = await fetch(
        "https://jsonplaceholder.typicode.com/users/5/todos"
    );
    let content = await response.json();
    content = content.splice(0, 20);

    let list = document.querySelector(".post");

    for (let key in content) {
        list.innerHTML += `
            <tr class="post">
                <td>${content[key].userId}</td>
                <td>${content[key].title}</td>
                <td>${content[key].completed}</td>
            </tr>
        `;
    }
}

getResponse();