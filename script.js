const container = document.getElementById('user-container');


async function fetchUsers(){
    const res = await fetch("https://randomuser.me/api/?results=10");
    const data = await res.json();

    data.results.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <img src = "${user.picture.medium}" alt="user">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>Gender: ${user.gender}</p>
        <p>${user.location.country}</p>

        `;
        container.appendChild(card);
        
    });
}

fetchUsers();