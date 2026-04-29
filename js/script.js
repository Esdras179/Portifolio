// SCROLL SUAVE
function scrollToSection() {
    document.querySelector("#sobre").scrollIntoView({
        behavior: "smooth"
    });
}

// GITHUB API
async function carregarRepos() {
    try {
        const response = await fetch("https://api.github.com/users/Esdras179/repos");
        const repos = await response.json();

        const container = document.getElementById("repos");
        container.innerHTML = "";

        repos.slice(0, 6).forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sem descrição"}</p>
                <a href="${repo.html_url}" target="_blank" class="btn">Ver</a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar repos:", error);
    }
}

// 🔥 TUDO SÓ DEPOIS QUE A PÁGINA CARREGAR
window.addEventListener("DOMContentLoaded", () => {

    carregarRepos();

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

    window.addEventListener("scroll", ativarAnimacao);

    // roda uma vez ao carregar
    ativarAnimacao();
});
