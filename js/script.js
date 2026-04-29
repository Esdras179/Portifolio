// SCROLL
function scrollToSection() {
    document.querySelector("#sobre").scrollIntoView({
        behavior: "smooth"
    });
}

// GITHUB API
async function carregarRepos() {
    const response = await fetch("https://api.github.com/users/Esdras179/repos");
    const repos = await response.json();

    const container = document.getElementById("repos");

    repos.slice(0, 6).forEach(repo => {
        if (!repo.description) return;

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <a href="${repo.html_url}" target="_blank" class="btn">Ver</a>
        `;

        container.appendChild(card);
    });
}

carregarRepos();

// animação ao rolar
const elements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if (position < screen - 100) {
            el.classList.add("show");
        }
    });
});
// animação
const elements = document.querySelectorAll(".fade");

function ativarAnimacao() {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if (position < screen - 100) {
            el.classList.add("show");
        }
    });
}

// roda no scroll
window.addEventListener("scroll", ativarAnimacao);

// roda ao carregar
window.addEventListener("load", ativarAnimacao);
