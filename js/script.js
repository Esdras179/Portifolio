function scrollToSection() {
    document.querySelector("#sobre").scrollIntoView({
        behavior: "smooth"
    });
}

window.addEventListener("DOMContentLoaded", () => {

    // HORA E DATA COM EFEITOS
    function atualizarHoraData() {
        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes();
        const segundos = agora.getSeconds();

        // Formatar hora
        const horaFormatada = String(horas).padStart(2, '0');
        const minutoFormatado = String(minutos).padStart(2, '0');
        const segundoFormatado = String(segundos).padStart(2, '0');

        // Atualizar hora digital
        const digitalTime = document.querySelector(".digital-time");
        if (digitalTime) {
            digitalTime.textContent = `${horaFormatada}:${minutoFormatado}:${segundoFormatado}`;
        }

        // Formatar data
        const opcoes = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);

        // Atualizar data
        const digitalDate = document.querySelector(".digital-date");
        if (digitalDate) {
            digitalDate.textContent = dataFormatada;
        }
    }

    // Atualizar continuamente
    atualizarHoraData();
    setInterval(atualizarHoraData, 1000);

    // GITHUB - REPOSITÓRIOS COM LAYOUT BONITO
    async function carregarRepos() {
        try {
            const response = await fetch("https://api.github.com/users/Esdras179/repos");
            const repos = await response.json();

            const container = document.getElementById("repos");
            container.innerHTML = "";

            repos.slice(0, 6).forEach(repo => {
                const card = document.createElement("div");
                card.classList.add("card");

                // Obter linguagem principal
                const linguagem = repo.language || "JavaScript";
                const stars = repo.stargazers_count || 0;
                const forks = repo.forks_count || 0;

                card.innerHTML = `
                    <h3>🔗 ${repo.name}</h3>
                    <p>${repo.description || "Sem descrição disponível"}</p>
                    
                    <div style="display: flex; gap: 15px; margin: 15px 0; font-size: 0.85rem; opacity: 0.7;">
                        <span>⭐ ${stars} stars</span>
                        <span>🍴 ${forks} forks</span>
                        <span>💻 ${linguagem}</span>
                    </div>
                    
                    <a href="${repo.html_url}" target="_blank" class="btn">
                        Ver no GitHub →
                    </a>
                `;

                container.appendChild(card);
            });
        } catch (error) {
            console.error("Erro ao carregar repos:", error);
            const container = document.getElementById("repos");
            container.innerHTML = "<p>Erro ao carregar repositórios</p>";
        }
    }

    carregarRepos();

    function aplicarTemaHorario() {
        const body = document.body;
        const hora = new Date().getHours();

        body.classList.remove("morning", "afternoon", "night");

        if (hora >= 18) {
            body.classList.add("night");
        } else if (hora >= 12) {
            body.classList.add("afternoon");
        } else {
            body.classList.add("morning");
        }
    }

    aplicarTemaHorario();
    setInterval(aplicarTemaHorario, 60 * 1000);

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

