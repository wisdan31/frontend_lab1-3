const allData = localStorage;

// Перебір даних
for (const key in allData) {
    const data = JSON.parse(allData[key]);

    // Перевірка користувача iOS
    if (data.os === "iOS") {
        // Додати користувача iOS до списку
        const userLi = document.createElement("li");
        userLi.innerHTML = `
            <h2>${data.name}</h2>
            <p>Вік: ${data.age}</p>
            <p>Навички: ${data.skill}</p>
            <p>Джерело: ${data.source}</p>
            <p>Відгук: ${data.feedback}</p>
            <p>Зручність використання: ${data.user - friendly}</p>
        `;
        userUl.appendChild(userLi);
    }
}