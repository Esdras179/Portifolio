function scrollToSection() {
    document.querySelector("#sobre").scrollIntoView({
        behavior: "smooth"
    });
}

window.addEventListener("DOMContentLoaded", () => {

    // GITHUB
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

    carregarRepos();

    // ANIMAÇÃO
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

    // MENU ATIVO
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    function ativarMenu() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        ativarAnimacao();
        ativarMenu();
    });

    ativarAnimacao();
    ativarMenu();
});
