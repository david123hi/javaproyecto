const loggedUser = JSON.parse(localStorage.getItem("user"));

const panelName = document.getElementById("panelName");
const roleBadge = document.getElementById("roleBadge");
const welcomeUser = document.getElementById("welcomeUser");
const roleDescription = document.getElementById("roleDescription");
const dashboardContent = document.getElementById("dashboardContent");
const logoutButton = document.getElementById("logoutButton");

const roles = {
    usuario: {
        panel: "Panel de Usuario",
        badge: "Usuario",
        description: "Desde este panel puedes revisar tus rutinas, clases disponibles y progreso personal.",
        cards: [
            {
                title: "Mis Rutinas",
                text: "Consulta las rutinas asignadas para tu entrenamiento semanal."
            },
            {
                title: "Mi Progreso",
                text: "Revisa tus avances, historial y objetivos cumplidos."
            },
            {
                title: "Clases Disponibles",
                text: "Explora las clases activas dentro de SportClub."
            }
        ]
    },

    coach: {
        panel: "Panel de Coach",
        badge: "Coach",
        description: "Desde este panel puedes gestionar alumnos, rutinas y evaluaciones deportivas.",
        cards: [
            {
                title: "Mis Alumnos",
                text: "Visualiza y administra los usuarios asignados a tu entrenamiento."
            },
            {
                title: "Rutinas",
                text: "Crea, edita y revisa rutinas personalizadas."
            },
            {
                title: "Evaluaciones",
                text: "Registra evaluaciones físicas y seguimiento de progreso."
            }
        ]
    },

    admin: {
        panel: "Panel de Administrador",
        badge: "Administrador",
        description: "Desde este panel puedes administrar usuarios, coaches, reportes y configuración general.",
        cards: [
            {
                title: "Gestión de Usuarios",
                text: "Administra las cuentas registradas en la plataforma."
            },
            {
                title: "Gestión de Coaches",
                text: "Revisa y actualiza información de los coaches del sistema."
            },
            {
                title: "Reportes",
                text: "Consulta estadísticas generales de SportClub."
            }
        ]
    }
};

if (!loggedUser) {
    window.location.href = "login.html";
} else {
    loadDashboard(loggedUser);
}

function loadDashboard(user) {
    const roleInfo = roles[user.role];

    if (!roleInfo) {
        localStorage.removeItem("user");
        window.location.href = "login.html";
        return;
    }

    panelName.textContent = roleInfo.panel;
    roleBadge.textContent = roleInfo.badge;
    welcomeUser.textContent = "Bienvenido, " + user.name;
    roleDescription.textContent = roleInfo.description;

    dashboardContent.innerHTML = "";

    roleInfo.cards.forEach(function(card) {
        const article = document.createElement("article");
        article.classList.add("dashboard-card");

        const title = document.createElement("h3");
        title.textContent = card.title;

        const text = document.createElement("p");
        text.textContent = card.text;

        article.appendChild(title);
        article.appendChild(text);

        dashboardContent.appendChild(article);
    });
}

logoutButton.addEventListener("click", function() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});