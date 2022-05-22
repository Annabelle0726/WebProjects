const USER_CARD_TEMPLATE = document.querySelector("[data-user-template]");
const USER_CARDS_CONTAINER = document.querySelector("[data-user-cards-container]");
const SEARCH_INPUT = document.getElementById("search-id");
const SEARCH_BTN = document.getElementById("search-btn");
let users = [];
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
            users = data.map(user => {
                    const card = USER_CARD_TEMPLATE.content.cloneNode(true).children[0];
                    const header = card.querySelector("[data-header]");
                    const body1 = card.querySelector("[data-body-1]");
                    const body2 = card.querySelector("[data-body-2]");
                    const body3 = card.querySelector("[data-body-3]");
                    const body4 = card.querySelector("[data-body-4]");
                    const body5 = card.querySelector("[data-body-5]");
                    header.textContent = `${user.username}`;
                    body1.textContent = `${user.email}`;
                    body2.textContent = `${user.address.street}`;
                    body3.textContent = `${user.phone}`;
                    body4.textContent = `${user.address.zipcode}`;
                    body5.textContent = `${user.company.name}`;
                    USER_CARDS_CONTAINER.append(card);
                    return {
                        username: user.username, company_name: user.company.name, element: card
                    };
                }
            )
        }
    )
SEARCH_INPUT.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    console.log(value)
    users.forEach(user => {
        const isVisible = user.username.toLowerCase().includes(value) || user.company_name.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})

SEARCH_BTN.addEventListener("click", e => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    console.log(value)
    users.forEach(user => {
        const isVisible = user.username.toLowerCase().includes(value) || user.company_name.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})
